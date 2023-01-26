from backend import celery_app

import email
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from datetime import datetime, timedelta, date
import random
import chevron


from .models import Campaign, Lead, Sequence, Variant
from core.models import GenericSender

def get_sender(campaign):
    senders = [sender.email for sender in campaign.senders.all()]
    # Retrieving all the leads already contacted
    already_sended = Lead.objects.filter(campaign=campaign, already_sended=True)
    if already_sended.count() == 0:
        return campaign.senders.get(email=senders[0])
    else:
        sender = already_sended.last().sended_by
        if sender.email == senders[-1]:
            return sender
        elif Lead.objects.filter(sended_by=sender).count() >= campaign.email_per_sender:
            sender_email = senders[senders.index(sender.email) + 1]
            return campaign.senders.get(email=sender_email)
        else:
            return sender

def get_waiting_minutes(campaign, current_sender):
    sender = get_sender(campaign)
    if sender.pk != current_sender.pk:
        return campaign.waiting_time
    if current_sender.sending_limits > campaign.waiting_time:
        return current_sender.sending_limits
    else:
        return campaign.waiting_time

def update_sender_daily_limits(sender):
    if date.today() != sender.today:
        sender.today = date.today()
        sender.sended_today = 0
        sender.save()


def find_next_date(campaign):
    current_day = datetime.weekday(date.today())
    days_of_the_week = [0,1,2,3,4,5,6]
    days_in_second_format = [*days_of_the_week[days_of_the_week.index(current_day):], *days_of_the_week[:days_of_the_week.index(current_day)]]
    for i in range(1,7):
        if days_in_second_format[i] in campaign.allowed_days:
            return i 
    return days_in_second_format[1]


def update_campaign_daily_limits(campaign):
    if campaign.today is None:
        campaign.today = date.today()
        return True
    if date.today() != campaign.today:
        if date.weekday(date.today()) in campaign.allowed_days:
            campaign.today = date.today()
            campaign.sended_today = 0
            campaign.save()
            return True
        else:
            next_mail = datetime.utcnow() + timedelta(days=find_next_date(campaign))
            send_mail.apply_async((campaign.id,), eta=next_mail)
            return False
    return True

def get_template(campaign):
    leads = Lead.objects.filter(campaign=campaign, already_sended=False)
    if leads.count() > 0:
        try:
            sequence = Sequence.objects.get(campaign=campaign, current=True)
            variant = random.choice(list(Variant.objects.filter(sequence=sequence)))
            return variant
        except Sequence.DoesNotExist:
            new_sequence = Sequence.objects.filter(campaign=campaign)[0]
            new_sequence.current = True
            new_sequence.save()
            sequence = Sequence.objects.get(campaign=campaign, current=True)
            variant = random.choice(list(Variant.objects.filter(sequence=sequence)))
            return variant
    elif leads.count() == 0:
        Lead.objects.filter(campaign=campaign).update(already_sended=False)
        sequences = [sequence.name for sequence in list(Sequence.objects.filter(campaign=campaign).order_by('id'))]
        current_sequence = Sequence.objects.get(campaign=campaign, current=True)
        try:
            new_sequence = Sequence.objects.get(campaign=campaign, name=sequences[sequences.index(current_sequence.name) + 1])
            new_sequence.current = True
            new_sequence.save()
            current_sequence.current = False
            current_sequence.save()
            next_mail = datetime.utcnow() + timedelta(days=current_sequence.waiting_time)
            send_mail.apply_async((campaign.id,), eta=next_mail)
            return False
        except IndexError:
            campaign.status = 'completed'
            campaign.save()
            return False


def merge_tags(campaign, lead, content):
    merge_tags = {
        'First Name': lead.first_name,
        'Last Name': lead.last_name,
        'Email': lead.email,
        'Ice-bracker': lead.ice_braker,
        'Personalisation': lead.personalisation,
        'Phone Number': lead.phone_number,
        'Job Title': lead.job_title,
        'Company': lead.company
    }
    for custom_field in campaign.leads_fields['customFields']:
        merge_tags[custom_field] = lead.custom_fields[custom_field]
    return chevron.render(content, merge_tags)

@celery_app.task
def send_mail(campaign_id):
    campaign = Campaign.objects.get(id=campaign_id)
    if campaign.status == 'active':
        status = update_campaign_daily_limits(campaign)
        if not status:
            return False
        leads = Lead.objects.filter(campaign=campaign, already_sended=False)
        sender = get_sender(campaign)
        update_sender_daily_limits(sender)
        variant = get_template(campaign)
        if variant == False:
            return False
        template = variant.template
        if template:
            if (campaign.sended_today >= campaign.daily_campaign) or (sender.sended_today >= sender.daily_campaign):
                    next_mail = datetime.utcnow() + timedelta(days=find_next_date(campaign))
                    send_mail.apply_async((campaign_id,), eta=next_mail)
                    return False
            lead = leads.first()
            if (not lead.replied) and lead.subscribe:
                subject = merge_tags(campaign, lead, template.subject) 
                msg = MIMEMultipart('alternative')
                msg['Subject'] = subject
                msg['From'] = sender.email
                msg['To'] = lead.email
                msg.attach(MIMEText(merge_tags(campaign, lead, template.content), 'html'))

                smtp_server = smtplib.SMTP(sender.smtp_host)
                smtp_server.starttls()

                smtp_server.login(sender.email, sender.smtp_password)

                smtp_server.send_message(msg)
                lead.already_sended = True
                lead.contacted = True
                lead.emails_sent.append({
                    'sender_id': sender.id,
                    'template_id': template.id,
                    'variant_id': variant.id,
                    'subject': subject
                })
                lead.sended_by = sender
                lead.save()
                campaign.sended_today += 1
                campaign.save()
                sender.sended_today += 1
                sender.total_sent += 1
                sender.save()
                variant.total_sent += 1
                variant.save()
                template.total_sent += 1 
            else:
                lead.sended_by = sender
                lead.save()
            
            next_mail = datetime.utcnow() + timedelta(minutes=get_waiting_minutes(campaign, sender))
            send_mail.apply_async((campaign_id,), eta=next_mail)

            smtp_server.quit()    
        else:
            return False
    else:
        return False


@celery_app.task
def send_test_email(subject, content, emails):
    emails = emails.split(',')
    for address in emails:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = 'teseonicolo@gmail.com'
        msg['To'] = address
        msg.attach(MIMEText(content, 'html'))

        smtp_server = smtplib.SMTP('smtp.gmail.com')
        smtp_server.starttls()

        smtp_server.login('teseonicolo@gmail.com', 'tcigwtbcuoffkzwt')

        smtp_server.send_message(msg)
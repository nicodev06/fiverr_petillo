from celery import shared_task

import smtplib
import email


#email_from, email_to, host, password, subject, content
@shared_task
def send_mail():
    print(2 + 2)
    '''print('Hello world')
    msg = email.message.EmailMessage()
    msg['Subject'] = subject
    msg['From'] = email_from
    msg['To'] = email_to
    msg.set_content(content)

    smtp_server = smtplib.SMTP(host)
    smtp_server.starttls()

    smtp_server.login(email_from, password)

    smtp_server.send_message(msg)

    smtp_server.quit()'''
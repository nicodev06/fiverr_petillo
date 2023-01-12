# Script to test SPF, DKIM and DMARC records for a given domain

import smtplib
import imaplib
import email
import re
import dns.resolver as DnsResolver

def test_spf(domain):
    try:
        test_spf = DnsResolver.resolve(domain , 'TXT')
        for dns_data in test_spf:
            if 'spf1' in str(dns_data):
                return True
    except DnsResolver.NXDOMAIN:
        return False

def test_dmarc(domain):
    try:
      test_dmarc = DnsResolver.resolve('_dmarc.' + domain , 'TXT')
      for dns_data in test_dmarc:
        if 'DMARC1' in str(dns_data):
          return True
    except DnsResolver.NXDOMAIN:
      return False


def send_mail(email_addr, host, password, subject, content):
    msg = email.message.EmailMessage()
    msg['Subject'] = subject
    msg['From'] = email_addr
    msg['To'] = email_addr
    msg.set_content(content)

    smtp_server = smtplib.SMTP(host)
    smtp_server.starttls()

    smtp_server.login(email_addr, password)

    smtp_server.send_message(msg)

    smtp_server.quit()


def extract_dkim_selector(email_addr, smtp_host, imap_host, smtp_password, imap_password):
    try:
      send_mail(email_addr, smtp_host, smtp_password, 'DKIM test', 'This is a test to extract DKIM selector')
      imap_server = imaplib.IMAP4_SSL(imap_host)
      imap_server.login(email_addr, imap_password)
      imap_server.select('INBOX')
      _ , data = imap_server.search(None, 'SUBJECT "DKIM test"')
      for num in data[0].split():
          status , data = imap_server.fetch(num, "(RFC822)")
          if status == 'OK':
            try:
                  msg = email.message_from_bytes(data[0][1])
                  dkim_header = msg['DKIM-Signature']
                  dkim_selector_pattern = r's=([^;]+)'
                  match = re.search(dkim_selector_pattern, dkim_header)
                  if match:
                          dkim_selector = match.group(1)
                          return (True, dkim_selector)
            except:
                  return (False,)
          else:
              return (False,)
    except:
        print("timeout")
        extract_dkim_selector(email_addr, smtp_host, imap_host, smtp_password, imap_password)
       
    imap_server.close()
    imap_server.logout()


def test_dkim(domain, email_addr, smtp_host, imap_host, smtp_password, imap_password):
    try:
      selector = extract_dkim_selector(email_addr, smtp_host, imap_host, smtp_password, imap_password)
      if not selector[0]:
            return False
      test_dkim = DnsResolver.resolve(selector[1] + '._domainkey.' +  domain, 'TXT')
      for dns_data in test_dkim:
        if 'DKIM1' in str(dns_data):
          return True
    except DnsResolver.NXDOMAIN:
      return False
    
def verification(domain, email_addr, smtp_host, imap_host, smtp_password, imap_password):
    report = {}
    report["spf"] = test_spf(domain)
    report["dmarc"] = test_dmarc(domain)
    report["dkim"] = test_dkim(domain, email_addr, smtp_host, imap_host, smtp_password, imap_password)
    return report


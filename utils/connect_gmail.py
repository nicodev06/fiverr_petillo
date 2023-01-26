#tcigwtbcuoffkzwt

'''import imaplib

# Dati di accesso
username = 'teseonicolo@outlook.com'
password = 'tiscatusc@'

# Connessione al server IMAP
imap_server = imaplib.IMAP4_SSL('outlook.office365.com')

# Autenticazione
print(imap_server.login(username, password))'''

import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Dati di accesso
username = 'teseonicolo@outlook.com'
password = 'tiscatusc@'

# Connessione al server SMTP
smtp_server = smtplib.SMTP('outlook.office365.com', 587)

msg = MIMEMultipart('alternative')
msg['Subject'] = 'h'
msg['From'] = 'teseonicolo@outlook.com'
msg['To'] = 'teseonicolo@gmail.com';

# Inizio del cifraggio TLS
smtp_server.starttls()

# Autenticazione
smtp_server.login(username, password)


print(smtp_server.send_message(msg))

#smtplib.SMTPAuthenticationError'''

'''import dns.resolver

print ("Testing domain", 'gainzvaperstore.com', "for DMARC record...")

test_dmarc = dns.resolver.resolve('_dmarc.' + 'gmail.com' , 'TXT')
for dns_data in test_dmarc:
    if 'DMARC1' in str(dns_data):
        print ("  [PASS] DMARC record found :",dns_data)'''
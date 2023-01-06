'''import imaplib

# Dati di accesso
username = 'teseonicolo@outlook.com'
password = 'tiscatusc@'

# Connessione al server IMAP
imap_server = imaplib.IMAP4_SSL('outlook.office365.com')

# Autenticazione
print(imap_server.login(username, password))'''

import smtplib

# Dati di accesso
username = 'teseonicolo@outlook.com'
password = 'tiscatusc@'

# Connessione al server SMTP
smtp_server = smtplib.SMTP('outlook.office365.com', 587)

# Inizio del cifraggio TLS
smtp_server.starttls()

# Autenticazione
print(smtp_server.login(username, password))

#smtplib.SMTPAuthenticationError
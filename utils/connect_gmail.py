import imaplib

#vaxutyswwqqdecaj
# Connessione al server di posta di Gmail
mail = imaplib.IMAP4_SSL('imap.gmail.com')

try:
    response = mail.login('teseonicolo@gmail.com', 'vaxutswwqqdecaj')
except imaplib.IMAP4.error as error:
    print(error.__repr__())    


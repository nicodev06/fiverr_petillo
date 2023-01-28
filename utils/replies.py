import imaplib
import email


imap_server = imaplib.IMAP4_SSL("imap.gmail.com")
imap_server.login('cristantefrancesco830@gmail.com', 'bhweomgyrtsyrbey') #bhweomgyrtsyrbey


imap_server.select('"[Gmail]/Posta inviata"')

status, email_ids = imap_server.search(None,'SUBJECT "Hello Francesco" TO "cristantefrancesco830@gmail.com"')
email_ids = email_ids[0].split()

for email_id in email_ids:
    status, email_data = imap_server.fetch(email_id, "(RFC822)")
    for response_part in email_data:
        if isinstance(response_part, tuple):
            message = email.message_from_bytes(response_part[1])

            msg_from = message['from']
            if len(msg_from.split('<')) > 1:
                msg_from = msg_from.split('<')[-1][:-1]
            else:
                pass
            mail_subject = message['subject']
            print((message['date']))

            if message.is_multipart():
                mail_content = ''
                for part in message.get_payload():
                    if part.get_content_type() == 'text/plain':
                        mail_content += part.get_payload()
            else:
                mail_content = message.get_payload()

            print(f'From: {msg_from}')
            print(f'Subject: {mail_subject}')
            print(f'Content: {mail_content}')


imap_server.select('"INBOX"')

for email_id in email_ids:
    status, email_data = imap_server.fetch(email_id, "(RFC822)")
    for response_part in email_data:
        if isinstance(response_part, tuple):
            message = email.message_from_bytes(response_part[1])

            msg_from = message['from']
            if len(msg_from.split('<')) > 1:
                msg_from = msg_from.split('<')[-1][:-1]
            else:
                pass
            mail_subject = message['subject']
            print((message['date']))

            if message.is_multipart():
                mail_content = ''
                for part in message.get_payload():
                    if part.get_content_type() == 'text/plain':
                        mail_content += part.get_payload()
            else:
                mail_content = message.get_payload()

            print(f'From: {msg_from}')
            print(f'Subject: {mail_subject}')
            print(f'Content: {mail_content}')



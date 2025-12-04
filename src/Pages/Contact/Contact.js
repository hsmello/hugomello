import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import TextField from '../../Components/TextField.js'
import MultilineText from '../../Components/Multiline.js'
import Button from '../../Components/Button.js'


function Contact() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
            publicKey: 'YOUR_PUBLIC_KEY',
        })
        .then(() => {
            console.log('SUCCESS!');
            alert('Your message was sent successfully!');
            form.current.reset();
            },
            (error) => {
            console.log('FAILED...', error.text);
            alert('Failed to send your message. Please try again later.');
            }
        );
    };

    return (
        <div>
            Contact
            <TextField label="Name" width='350px' />
            <TextField label="Email" width='350px' />
            <MultilineText label="Email Body" width='500px' />
            <Button label="Send" onClick={(e) => sendEmail(e)}/>
        </div>
    );
}

export default Contact;
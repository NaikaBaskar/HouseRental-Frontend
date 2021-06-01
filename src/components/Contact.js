import React from 'react'
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';



function Contact() {
    return (
        <div id='contact'>
            <section id='contact'>
            <h3>Write to Us:</h3>
            <div className="contact-input">
                <input type="email" placeholder='example@gmail.com' />
                <a href="mailto:mickymadhan3@gmail.com">Contact</a>
            </div>
            <h3>Follow Us:</h3>
            <div class="social">
                <SocialIcon url="https://www.twitter.com/" />
                <SocialIcon url="https://www.linkedin.com/" />
                <SocialIcon url="https://www.instagram.com/" />
                <SocialIcon url="https://www.facebook.com/" />
	        </div>
            </section>
        </div>
    )
}

export default Contact

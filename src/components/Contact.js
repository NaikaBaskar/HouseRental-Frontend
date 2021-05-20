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
                <SocialIcon url="https://www.twitter.com/LuckyMadhan3" />
                <SocialIcon url="https://www.linkedin.com/in/gundu-madhan-b89768151/" />
                <SocialIcon url="https://www.instagram.com/the_lmntrix_guy" />
                <SocialIcon url="https://www.facebook.com/LuckyMadhan" />
	        </div>
            </section>
        </div>
    )
}

export default Contact

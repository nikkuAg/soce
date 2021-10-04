import React, { useState } from 'react'
import { Form, Icon, Button } from 'semantic-ui-react'
import './form.css'
import './college.css'
import { MenuHeader } from './Menu'
import { Footer } from './Footer'
import emailjs from 'emailjs-com'


export const Contact = () => {
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)
    const emailSend = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_c1uzcef', 'template_xk9l1uj', e.target, 'user_HLiALyhyOPQsarOxLxtZn')
            .then(res => {
                setsuccess(true)
                document.getElementById("clear").value = ""
                document.getElementById("clear1").value = ""
                document.getElementById("clear2").value = ""
                alert("Your message has been sent.")
            }
            ).catch(err => {
                console.log(err)
                seterror(true)
                alert("Error in sending your message!! Try Again...")
            })


    }

    return (
        <>
            <MenuHeader active="contact us" />
            <div id="contactUs">
                <div id="intro">
                    <div id="card">
                        <h2>Divyansh Agarwal</h2>
                        <p>IIT Roorkee, Student</p>
                        <p>Web Developer, SOCE</p>
                        <div>
                            <p>Social Handles: </p>
                            <a target="_blank" href="https://www.instagram.com/divyanshag_/"><Icon name="instagram" size="big" className="extra" /></a>
                            <a target="_blank" href="https://github.com/nikkuAg"><Icon name="github" size="big" className="extra" /></a>

                        </div>
                    </div>
                    <div id="card">
                        <h2>Pawan Kumar Aggarwal</h2>
                        <p>Data Manager, SOCE</p>
                        <div>
                            <p>Social Handles: </p>
                            <a target="_blank" href="https://twitter.com/pk_agarwal"><Icon name="twitter" size="big" className="extra" /></a>
                        </div>
                    </div>
                </div>
                <Form id="contact" onSubmit={emailSend}>
                    <h2 className="pageHeading">Contact Us</h2>
                    <Form.Input fluid label='Name' name="name" placeholder='Name' id="clear" required />
                    <Form.Input type="email" fluid label='Email' name="email" id="clear1" email="email" placeholder='Email' required />
                    <Form.TextArea label='Message' name="message" id="clear2" placeholder='Enter your message...' required />
                    <Button type="submit" primary>Send</Button>
                </Form>
            </div>
            <br /><br /><br /><br />
            <Footer />
        </>
    )
}

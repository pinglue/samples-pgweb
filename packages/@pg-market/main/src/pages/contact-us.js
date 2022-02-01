import "../pg/hub-factory";
import React, {useState} from "react";

import {usePin} from "@pgweb/react-utils";

export default function() {

    // form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Pin materials
    const {runA, isReady, log} = usePin();

    // form submission
    const onSubmit = async event => {        
        event.preventDefault();
        const data = {name, email, message};
        
        // Running @submit-form channel 
        const res = await runA("submit-form", {
            id: "contact-us",
            data
        });
        log.mark("form submission response is", res);
    }  
    
    if (!isReady) return;

    return (

        <article>
            <h1>
                Contact us
            </h1>
            <p>
                We'll get back yo you as soon as possible
            </p>
            <form onSubmit={onSubmit}>
                <div>
                    <label> Name: </label>
                    <input 
                        name="name"
                        onChange={e=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <label> Email: </label>
                    <input 
                        name="email"
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label> Your message </label>
                    <textarea 
                        name="message"
                        onChange={e=>setMessage(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Submit!"/>                       
                </div>
            </form>
        </article>
    );
}

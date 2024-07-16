import React from 'react'

const LoginForm=()=>{
    const emailRef=React.useRef();
    const passwordRef=React.useRef();

    const handleSubmit=(event)=>{
        event.preventDefault();
        const email=emailRef.current.value
        const password=passwordRef.current.value;

        alert(email + ' ' + password);
    }
    return(
        <form onSubmit={handleSubmit}>
            <div>LoginForm
                <label htmlfor="email">Enter your Email</label>
                <input id="email" type="text" ref={emailRef}/>
            </div>
            <div>
                <label htmlfor="password">Enter your Password</label>
                <input id="password" type="password" ref={passwordRef}/>
            </div>
            <button type="submit">Submit</button>
            </form>
    );
};

export {LoginForm};
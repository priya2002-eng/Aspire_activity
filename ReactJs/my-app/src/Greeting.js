import React from 'react'
import ReactDOM from 'react-dom/client'
import UserGreeting from './UserGreeting';
import GuestGreeting from './GuestGreeting';
export default function Greeting(props){
    const isLoggedIn=props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting/>
    }
    else{
        return <GuestGreeting/>
     }
    }
    const root=ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Greeting isLoggedIn={false}/>);
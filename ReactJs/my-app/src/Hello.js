import React from 'react'

export default function Hello(props){
    return (
        <div>Hello User! Welcome to React
            <h1>Hi This is a user named {props.name} and your password {props.password}</h1>
        </div>
        
    )
}
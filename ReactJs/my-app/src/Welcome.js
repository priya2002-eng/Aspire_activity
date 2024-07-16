import React, { Component } from 'react'

class Welcome extends Component{
    render(){
        return(
            <div>
                <h1 style={{color:this.props.color}}>Hi ! you are welcome to React </h1>
                <h2>Hello {this.props.name} you are from {this.props.location}</h2>
                <h3>Today's Topic: {this.props.children}</h3>
            </div>
        )
    }
}

export default Welcome;
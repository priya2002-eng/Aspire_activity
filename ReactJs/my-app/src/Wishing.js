import React ,{ Component } from 'react'

export default class Wishing extends Component{
    constructor(props){
        super(props)

        this.state={
            username: "Zuhale"
        }
    }
    changeName(event){
        this.setState({
            username:event.target.value
        })
    }
    render(){
        return(
            <div>Wishing
                <h1>Hi {this.state.username} Welcome </h1>
                Enter your UserName: <input type='text' name='username' value={this.state.username}
                onChange={(event)=>this.changeName(event)}/>
            </div>
        )
    }
}


import React, { Component } from 'react'

export class UpdatingDemo extends Component{
    constructor(props){
        super(props)

        this.state={
            name:'Himayun'
        }
    }
    ChangeName(event){
        this.setState({
            name:'Akbar'
        })
    }
    render(){
        return(
            <div>
                UpdatingDemo
                <h2 style={{color:'blue'}}>Welcoming the King {this.state.name}</h2>
                <button onClick ={(event)=>this.ChangeName(event)}>Update Name</button>
            </div>
        )
    }
    getSnapshotBeforeUpdate(preProps,preState){
        console.log("Snapshot before update",preState.name);
        return null;
    }
    componentDidMount(){
        console.log("Component is updated in the Dom")
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.name===this.state.name){
            return false;
        }
        return true;
    }
}

export default UpdatingDemo
import React, {Component} from 'react'

export class ConditionalRendering extends Component{
    render(){
        let value=1
        let layout=null
        if(value==1){
            layout=<div style={{'color':'Red','background':'orange'}}>
                This is a Layout 1
                </div>
        }
        else{
            layout=<div style={{'color':'Red','background':'orange'}}>
                This is a Layout 2
                </div>
        }
        return(
            <div>ConditionalRendering</div>
        )
    }
}
export default ConditionalRendering
import React, {Component} from 'react'
const HoC=(OriginalComponent)=>{
    return class ModifiesComponent extends Component{
        constructor(props){
            super(props)
            
            this.state={
                count:0
            }
        }
        incrementCounter(){
            this.setState({
                count:this.state.count + 1
            })
        }
        render(){
            return (
                <div>
                    <OriginalComponent count={this.state.count} incrementCounter={(event)=>this.incrementCounter(event)}></OriginalComponent>
                </div>
            )
        }
    }
}

export default HoC;
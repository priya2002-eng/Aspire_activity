import HoC from './ModifiesComponent'
import React, { Component } from 'react'

export class Wishlabel extends Component{
    render(){
        return(
            <div>
                <br/>
                Counter:{this.props.count}
                <label onMouseOver={this.props.incrementCounter}><br/>Move Here</label>
            </div>
        )
    }
}

export default HoC(Wishlabel)
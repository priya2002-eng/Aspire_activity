// import React, { Component } from 'react'

// export default class AddToCart extends Component{
//     constructor(props){
//         super(props)

//         this.state = {
//             cart: 0
//         }
//     }
//     incrementCounter(event){
//         this.setState({
//             cart:this.state.cart + 1
//         })
//     }
//     render(){
//         return(
//         <div>
//             <h1 style = {{color: 'blue'}}>AddToCart</h1>
//             <button onClick={(event)=>this.incrementCounter(event)}> Counter: {this.state.cart}</button>
//         </div>
//         )
        
//     }
// }





// import React, { Component } from 'react';

// export default class AddToCart extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             cart: 0
//         };

//         this.incrementCounter = this.incrementCounter.bind(this);
//     }

//     incrementCounter() {
//         this.setState({
//             cart: this.state.cart + 1
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h1 style={{ color: 'blue' }}>AddToCart</h1>
//                 <label 
//                     onMouseOver={this.incrementCounter} 
//                     style={{ cursor: 'pointer', padding: '10px', display: 'inline-block', border: '1px solid #000' }}
//                 >
//                     Counter: {this.state.cart}
//                 </label>
//             </div>
//         );
//     }
//}







import React, { Component } from 'react'
import HoC from './ModifiesComponent'

export  class AddToCart extends Component{
    
    render(){
        return(
        <div>
            <h1 style = {{color: 'blue'}}>AddToCart</h1>
            <button onClick={this.props.incrementCounter}> Counter: {this.props.count}</button>
        </div>
        )
        
    }
}
export default HoC(AddToCart)
import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Product extends Component{
    render(){
        return(
            <div>
               <h1 style = {{color:'Green'}}>Product</h1>
                <li><Link to = '/product/laptop'>View all the laptop brands</Link></li>
               <ol>

                <li> Laptop brands</li>
               </ol>
            </div>
        )
    }
}

export default Product
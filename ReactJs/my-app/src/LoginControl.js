// import React, {Component} from 'react'
// import { ReactDOM } from 'react-dom/client';
// import LoginButton from './LoginButton';
// import LogoutButton from './LogoutButton';
// import Greeting from './Greeting';

// export default class LoginControl extends Component{
//     constructor(props){
//         super(props)
//         this.handleLoginClick=this.handleLoginClick.bind(this);
//         this.handleLogoutClick=this.handleLogoutClick.binnd(this);

//         this.state={
//             isLoggedIn:false
//         };
//     }
//     handleLoginClick(){
//         this.setState({
//             isLoggedIn:true
//         });

//     }
//     handleLogoutClick(){
//         this.setState({
//             isLoggedIn:false
//         });
//     }
//     render(){
//         const isLoggedIn=this.state.isLoggedIn;
//         let button;
//         if(isLoggedIn){
//             button=<LogoutButton onClick={this.handleLoginClick}/>;
//         }
//         else{
//             button=<LoginButton onClick={this.handleLogoutClick}/>;
//         }
//         return(
//             <div>
//                 <Greeting isLoggedIn = {isLoggedIn}/>
//                 {button}
//             </div>
//         );
//     }
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<LoginControl/>)





import React,{Component} from 'react'
import ReactDOM from 'react-dom/client'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Greeting from './Greeting';
export default class LoginControl extends Component{
    constructor(props){
        super(props)

        this.handleLoginClick=this.handleLoginClick.bind(this);
        this.handleLogoutClick=this.handleLogoutClick.bind(this);
        this.state={
           isLoggedIn:false
        }
    }
    handleLoginClick(){
        this.setState({
            isLoggedIn:true
        });
    }
    handleLogoutClick(){
        this.setState({
            isLoggedIn:false
        });
    }
    render(){
        const isLoggedIn=this.state.isLoggedIn;
        let button;
        if(isLoggedIn){
            button=<LogoutButton onClick={this.handleLogoutClick}/>
        }
        else{
            button=<LoginButton onClick={this.handleLoginClick}/>
        }
        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn}/>
                {button}
                </div>
        )
    }
}const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginControl/>)
import React from 'react' ;
import { connect } from 'react-redux' ;
import {loginUser} from '../action/auth' ;
import { Navigate } from 'react-router-dom' ;

import '../css/login.css' ;


class Login extends React.Component{
    constructor(){
        super() ;
        this.state = {
            email : null , 
            password : null
        }
    }

    handleChange = (field , value) => {
        this.setState({
            [field] : value 
        })
    }

    handleSubmit = () => {
        console.log("Login Pressed") ;
        const {email , password} = this.state ;
        if(!email && !password)return ;
        this.props.dispatch(loginUser(email , password)) ;

    }


    render(){
        const { isLoggedIn } = this.props.auth ;
        if(isLoggedIn){
            return <Navigate to="/" />
        }
        return (
            <div className="primary">
                anuranjan8319918906@gmail.com
                <div className="preprimary">
                    <h1>Login to Ecovia</h1>
                    <div className="preprimary-email-input">
                        <input 
                                type="email" 
                                placeholder="Enter Email-Id"
                                onChange={(e) => this.handleChange("email" ,e.target.value)}>
                        </input>
                    </div> 
                    <div className="preprimary-pwd-input">
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            onChange={(e) => this.handleChange("password" ,e.target.value)}></input>
                    </div> 
                    <div className="login_button">
                                <button onClick={this.handleSubmit}>Login</button>
                    </div>
                </div>
            </div> 
        )
    }
}

function mapStateToProps({auth}){
    return {
        auth 
    }
}
export default connect(mapStateToProps)(Login);


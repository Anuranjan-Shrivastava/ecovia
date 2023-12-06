import React from 'react' ;
import { Navigate } from 'react-router-dom';
import '../css/signup.css' ;



class Signup extends React.Component{

    constructor(){
        super() ;
        this.state = {
            name : null , 
            gender : null , 
            email : null , 
            password : null , 
            confirmPassword : null , 
            city : null , 
            state : null , 
            country : null , 
            contact : null , 
            addr : null , 
            success : false 
        }
    }

   handleChange =  async (field , value) => {
        await  this.setState({
           [field] : value 
        }) ;    
   }
   onSignupClick =  () => {
       console.log("SignUp Pressed") ;
       console.log(this.state) ;
       const {
        name , 
        email , 
        password , 
        confirmPassword , 
        city , 
        state , 
        country , 
        contact , 
        addr 
       } = this.state ; 
       if(password !== confirmPassword)return ;
      
       if(!name  || !email || !password || 
        !city || !state || !country || !addr  ){
        console.log("Something Missing") ;
        return ;
       }
       //Please Match Password and confirm Password
       const formBody = {name ,email , password , city , state , country , addr , contact } ;
       let url = "https://ecovia-backend.vercel.app/user/signup" ;
       let options = {
           method : "POST" , 
           headers : {
            'Content-Type' : 'application/json'
           } ,
           body : JSON.stringify(formBody) 
       }
        fetch(url , options)
        .then((res) => res.json())
        .then( data => {
            if(data.data.success){
               this.setState({
                    success : true 
                })
            }   
       }) ;



   }
    render(){
        if(this.state.success === true){
            return <Navigate to='/login'/>
        }
        return (
            <div className="container">
                   <div className="container-left">
                        <div className ="container-left-name">
                            
                             <input 
                                 type ="text" 
                                 placeholder="Name"  
                                 autoComplete="off"
                                 onChange={(e) => this.handleChange("name" ,e.target.value)}/>
                        </div>
                        <div className ="container-left-contact">
                             {/* <span className="details">Contact : </span> */}
                             <input 
                                 type ="text" 
                                 placeholder="Contact"  
                                 autoComplete="off"
                                 onChange={(e) => this.handleChange("contact" ,e.target.value)}/>
                        </div>
                        <div className ="container-left-address">
                             {/* <span className="details">Address : </span> */}
                             <input 
                                 type ="text" 
                                 placeholder="Address"  
                                 autoComplete="off"
                                 onChange={(e) => this.handleChange("addr" ,e.target.value)}/>
                        </div>
                        <div className ="container-left-city">
                             {/* <span className="details">City </span> */}
                             <input 
                                 type ="text" 
                                 placeholder="City"  
                                 autoComplete="off"
                                 onChange={(e) => this.handleChange("city" ,e.target.value)}/>
                        </div>
                        <div className ="container-left-state">
                             {/* <span className="details">State : </span> */}
                             <input 
                                 type ="text" 
                                 placeholder="State"  
                                 autoComplete="off"
                                 onChange={(e) => this.handleChange("state" ,e.target.value)}/>
                        </div>
                        <div className ="container-left-country">
                             {/* <span className="details">Country : </span> */}
                             <input 
                                 type ="text" 
                                 placeholder="Country"  
                                 autoComplete="off"
                                 onChange={(e) => this.handleChange("country" ,e.target.value)}/>
                        </div>    
                   </div>
                   <div className="container-right">
                        <div className="container-right-email">
                            <span className="details">Email : </span>
                            <input type ="email" 
                                   placeholder="Email-id"
                                   autoComplete="off" 
                                   required
                                   onChange={(e) => this.handleChange("email" ,e.target.value)}/>
                       </div>
                       <div className="container-right-password">
                             <span >Password : </span>
                             <input type ="password" 
                                    placeholder="Password"
                                    autoComplete="off"
                                    required 
                                    onChange={(e) => this.handleChange("password" ,e.target.value)}/>
                        </div>
                        <div className="container-right-confirmPassword">
                                 <span className="details">Confirm Password : </span>
                                 <input type ="password" 
                                        placeholder="Confirm Password"
                                        autoComplete="off" 
                                        required
                                        onChange={(e) => this.handleChange("confirmPassword" ,e.target.value)}/>
                        </div>
                        <div className="container-right-button">
                             <div onClick = {() => this.onSignupClick()}>Sign Up</div> 
                       </div>
                   </div>
           </div>  
           
        )
    }
}

export default Signup ; 
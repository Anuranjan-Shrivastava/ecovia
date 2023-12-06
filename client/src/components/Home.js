import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../action/auth' ;
import {  fetchAllStore , fetchInventoryDetail} from '../action/inventory';
import { Link, Navigate } from 'react-router-dom' ;
import '../css/home.css' ;

class Home extends Component {
    constructor(props){
        super() ;
        this.state = {
            addStoreClicked : false  , 
            openInventory : false ,
            name : null , 
            addr : null  ,
            city : null , 
            state : null , 
            country : null 

        }
        props.dispatch(fetchAllStore()) ;
        
    }

    handleChange = (field , value) => {
        this.setState({
            [field] : value 
        })
    }

    handleAddStoreClick = () => {

        if(this.state.addStoreClicked === false){
            let form = document.getElementsByClassName('loggedInHome-addStore-form')[0] ;
            form.style.height = "250px" ;
            let addStoreButton = document.getElementsByClassName('loggedInHome-addStore-button-add')[0] ;
            let content = addStoreButton.textContent ; 
            let index = -1 ; 
            let remove = setInterval(() => {
                 index++  ;
                 addStoreButton.textContent = content.substring(index , content.length) ;
                 if(index === 9){
                     clearInterval(remove) ;
                 }
                 
            } , 25) ;
            this.setState({
                addStoreClicked : true 
            })
            return ;
        }
        let form = document.getElementsByClassName('loggedInHome-addStore-form')[0] ;
        form.style.height = "0px" ;
        let addStoreButton = document.getElementsByClassName('loggedInHome-addStore-button-add')[0] ;
        let content = "Click to " ; 
        let index = content.length ;
        let adder = setInterval(() => {
            index-- ; 
            addStoreButton.textContent = content[index] + addStoreButton.textContent ;
            if(index === 0){
                clearInterval(adder) ;
            }
             
        } , 25) ;
        this.setState({
            addStoreClicked : false 
        })
        let inputs = document.getElementsByTagName('input') ;
        for(let i = 0 ; i < inputs.length ; i++){
             inputs[i].value = "" ;
        }
        return ;
    }

    handleAddStoreUpload = () => {
        console.log("Add store clicked") ;
        let {name , addr , city , state , country } = this.state ;
        if(!name || !addr || !city || !state || !country){
            alert("Some Detail Missing") ; 
            return ;
        }

        // cancelling form area
        let form = document.getElementsByClassName('loggedInHome-addStore-form')[0] ;
        form.style.height = "0px" ;  let addStoreButton = document.getElementsByClassName('loggedInHome-addStore-button-add')[0] ;
        let content = "Click to " ; 
        let index = content.length ;
        let adder = setInterval(() => {
            index-- ; 
            addStoreButton.textContent = content[index] + addStoreButton.textContent ;
            if(index === 0){
                clearInterval(adder) ;
            }
             
        } , 25) ;
        this.setState({
            addStoreClicked : false 
        })
        let inputs = document.getElementsByTagName('input') ;
        for(let i = 0 ; i < inputs.length ; i++){
             inputs[i].value = "" ;
        }
        
       //sending api
        let url = "https://ecovia-backend.vercel.app/inventory/addStore" ; 
        let token = localStorage.getItem('token') ;
        const options =  {
            method : "POST" , 
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${token}`
            } , 
            body : JSON.stringify({
                name , addr , city , state , country
            } )
        }
        fetch(url , options)
        .then(res => res.json())
        .then((data) => {
            this.props.dispatch(fetchAllStore()) ;
        })
        
    }
    handleLogout = () => {
        console.log("LogOut pressed") ;
        localStorage.removeItem('token') ;
        localStorage.removeItem('BagID') ; 
        this.props.dispatch(logoutUser()) ;
    }

    handleOpenInventory = (id) => {
        this.props.dispatch(fetchInventoryDetail(id)) ;
        localStorage.setItem('storeId' , id) ;
        this.setState({
            openInventory : true
        })
    }
    render() {
        let { addStoreClicked } = this.state ; 
        let stores = this.props.inventory.inventories ; 
        if(this.props.auth.isLoggedIn){
            if(this.state.openInventory){
                return <Navigate to="/storeDetails"/>
            }
            return (
                <div className='loggedInHome'>
                    <div className='loggedInHome-addStore'>
                         <div onClick={() => this.handleLogout()}
                              className='logoutButton'>
                            LOGOUT
                         </div>
                         <div className='loggedInHome-addStore-form'>
                             <div className='loggedInHome-addStore-form-detail'>
                                 <input type="text" 
                                        placeholder='Store name'
                                        onChange={(e) => this.handleChange("name",e.target.value)}/>
                             </div>
                             <div className='loggedInHome-addStore-form-detail' >
                                 <input type="text" placeholder='Store address'
                                         onChange={(e) => this.handleChange("addr",e.target.value)}/>
                             </div>
                             <div className='loggedInHome-addStore-form-detail'>
                                 <input type="text" placeholder='Store city'
                                         onChange={(e) => this.handleChange("city",e.target.value)}/>
                             </div>
                             <div className='loggedInHome-addStore-form-detail'>
                                 <input type="text" placeholder='Store state'
                                         onChange={(e) => this.handleChange("state",e.target.value)}/>
                             </div>
                             <div className='loggedInHome-addStore-form-detail'>
                                 <input type="text" placeholder='Store country'
                                         onChange={(e) => this.handleChange("country",e.target.value)}/>
                             </div>
                         </div>
                         <div className='loggedInHome-addStore-button'>
                    
                                <div className='loggedInHome-addStore-button-add'
                                    onClick={addStoreClicked ?() => this.handleAddStoreUpload() : () => this.handleAddStoreClick()}>
                                        Click to Add store
                                      
                                </div>
                                {addStoreClicked && <div className='loggedInHome-addStore-button-cancel'
                                  onClick={() => this.handleAddStoreClick()}>Cancel</div>}
                         </div>
                    </div>
                    <div className='loggedInHome-showStore'>
                          {stores.map((store) => {
                                return (<div className='loggedInHome-showStore-store'>
                                    <div className='loggedInHome-showStore-details'>
                                            <div ><span>store-name:-</span> {store.name}</div>
                                            <div ><span>address:-</span> {store.addr}</div>
                                            <div ><span>city:-</span> {store.city}</div>
                                            <div ><span>state:-</span> {store.state}</div>
                                            <div ><span>country:-</span> {store.country}</div>
                                    </div>
                                    <div className='loggedInHome-showStore-button'
                                       onClick={() => this.handleOpenInventory(store.id)}>
                                            Click to see details
                                    </div>                 
                                </div>)
                            })}
                         
                          
                    </div>
                </div>
            );
        }
        return (
            <div className='loggedOutHome'>
                <Link to="/signup" className='linky'>
                    <div className='loggedOutHome-signup'>Sign Up</div>
                </Link>
                <Link to="/login" className='linky'>
                    <div className='loggedOutHome-login'>Login</div>
                </Link>
            </div>
        );
    }
}


function mapStateToProps({auth , inventory}){
    return {
        auth , 
        inventory
    }
}

export default connect(mapStateToProps)(Home);
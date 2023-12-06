import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { Link, Navigate } from 'react-router-dom' ;
import { fetchBagDetail, fetchInventoryDetail  } from '../action/inventory';
import '../css/storedetails.css' ; 

class Storedetails extends Component {
    constructor(props){
        super() ; 
        this.state = {
            addBagClicked : false  , 
            size : null , 
            weight : null , 
            color : null , 
            gobacktohome : false 
        }
    }

    handleAddBagClick = () => {
        if(this.state.addBagClicked === false){
            let form = document.getElementsByClassName('storedetails-adder-form')[0] ;
            form.style.height = "150px" ;
            let addStoreButton = document.getElementsByClassName('storedetails-adder-button-add')[0] ;
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
                addBagClicked : true 
            })
            return ;
        }
        this.setState({
            addBagClicked : false 
        })
        let form = document.getElementsByClassName('storedetails-adder-form')[0] ;
        form.style.height = "0px" ;
        let addStoreButton = document.getElementsByClassName('storedetails-adder-button-add')[0] ;
        let content = "Click to " ; 
        let index = content.length ;
        let adder = setInterval(() => {
            index-- ; 
            addStoreButton.textContent = content[index] + addStoreButton.textContent ;
            if(index === 0){
                clearInterval(adder) ;
            }
             
        } , 25) ;
        let inputs = document.getElementsByTagName('input') ;
        for(let i = 0 ; i < inputs.length ; i++){
             inputs[i].value = "" ;
        }
    }
    handleChange = (field , value) => {
        this.setState({
            [field] : value 
        })
    }
    handleAddBagUpload = () => {
        let { size , color , weight} = this.state ;
        if(!size || !color || !weight){
            alert("Details Mising") ; 
            return ;
        }
        let inventoryId = this.props.inventory.store._id ;
        let url = "https://ecovia-backend.vercel.app/inventory/addBag" ;
        let token = localStorage.getItem('token') ;
        let options = {
            method : "POST" , 
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${token}`
            } , 
            body : JSON.stringify({
                size , color , weight , inventoryId
            })
        }
        fetch(url , options)
        .then(res => res.json())
        .then((data) => {
            console.log(data) ;
            this.props.dispatch(fetchInventoryDetail(inventoryId)) ;

        })  ; 
        let form = document.getElementsByClassName('storedetails-adder-form')[0] ;
        form.style.height = "0px" ;
        let addStoreButton = document.getElementsByClassName('storedetails-adder-button-add')[0] ;
        let content = "Click to " ; 
        let index = content.length ;
        let adder = setInterval(() => {
            index-- ; 
            addStoreButton.textContent = content[index] + addStoreButton.textContent ;
            if(index === 0){
                clearInterval(adder) ;
            }
             
        } , 25) ;
        let inputs = document.getElementsByTagName('input') ;
        for(let i = 0 ; i < inputs.length ; i++){
             inputs[i].value = "" ;
        }
    }
    handleBagDetails(uuid){
        console.log("Dispatching Bag Detail") ;
       localStorage.setItem('BagID' , uuid) ; 
       this.props.dispatch(fetchBagDetail(uuid)) ; 
    }
    gobacktohome = () => {
        this.setState({
            gobacktohome : true 
        })
    }
    render() {
        let store = this.props.inventory.store ; 
        let damaged = [] ;
        let ready = [] ; 
        let repair = [] ;
        if(store.damaged){
                for(let i = 0 ; i < store.damaged.length ; i++){
                    damaged.push(store.damaged[i]) ;
                }
                for(let i = 0 ; i < store.ready.length ; i++){
                    console.log(store.ready[i]) ;
                    ready.push(store.ready[i]) ;
                }
                for(let i = 0 ; i < store.repair.length ; i++){
                    console.log(store.repair[i]) ;
                    repair.push(store.repair[i]) ;
                }
        }
      
        
       
        
        let totalItems = 0 ; 
        let totalMovedOut = 0 ; 
        if(store){
             totalItems = store.totalItemPresent ; 
             totalMovedOut = store.totalItemMovedOut ;
        }
        
        
      
        let {addBagClicked} = this.state ;
        if(this.state.gobacktohome){
            return <Navigate to="/" />
        }
       
        return (
            <div className='storedetails'>
                <div className='gobackhome'
                   onClick={() => this.gobacktohome()}>Back to home</div>
                <div className='storedetails-cover'>
                    <div className='storedetails-adder'>
                        <div className='storedetails-adder-form'>
                            <div>
                                <input type="text" placeholder='Bag Size'
                                        onChange={(e) => this.handleChange("size" , e.target.value)}/>
                            </div>
                            <div>
                                <input type="text" placeholder='Bag Weight'
                                      onChange={(e) => this.handleChange("weight" , e.target.value)}/> 
                            </div>
                            <div>
                                <input type="text" placeholder='Bag Color'
                                       onChange={(e) => this.handleChange("color" , e.target.value)}/>
                            </div>
                        </div>
                        <div className="storedetails-adder-button"> 
                            <div className='storedetails-adder-button-add'
                                    onClick={addBagClicked ?() => this.handleAddBagUpload() : () => this.handleAddBagClick()}>
                                        Click to Add Bag
                                      
                            </div>
                                {addBagClicked && <div className='storedetails-adder-button-cancel'
                                  onClick={() => this.handleAddBagClick()}>Cancel</div>}
                        
                        </div>
                    </div>
                    <div className='storedetails-totalBags'>
                        <span style={{"text-decoration":"underline"}}>Total bags present </span>:-  {totalItems}
                        &nbsp; &nbsp;
                        <span style={{"text-decoration":"underline"}}> Total bags processed till now</span>:- {totalMovedOut}
                        
                    </div>
                    <div className='storedetails-readyBags'>
                        <div className='storedetails-readyBags-heading'>
                            Ready ({ready.length})
                        </div>
                       <div className='storedetails-readyBags-bags'>
                            {ready.map((bag) => {
                               return (
                                <Link to="/bagdetails" className='linky'>
                                 <div onClick={() => this.handleBagDetails(bag.uuid)}>{bag.uuid}</div>
                                 </Link>
                               )
                            })}
                        </div>
                    </div>
                    <div className='storedetails-repairedBags'>
                            <div className='storedetails-repairedBags-heading'>
                                Repaired ({repair.length})
                            </div>
                            <div className='storedetails-repairedBags-bags'>
                                {repair.map((bag) => {
                                return (
                                    <Link to="/bagdetails" className='linky'>
                                    <div onClick={() => this.handleBagDetails(bag.uuid)}> {bag.uuid}</div>
                                    </Link>
                                )
                                })}
                            </div>
                    </div>
                    <div className='storedetails-damagedBags'>
                            <div className='storedetails-damagedBags-heading'>
                                Damaged ({damaged.length})
                            </div>
                            <div className='storedetails-damagedBags-bags'>
                                {damaged.map((bag) => {
                                return (
                                    <Link to="/bagdetails" className='linky'>
                                        <div onClick={() => this.handleBagDetails(bag.uuid)}>
                                            {bag.uuid}
                                        </div>
                                    </Link>
                                )
                                })}
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps({auth , inventory}){
    return {
        auth , inventory
    }
}
export default connect(mapStateToProps)(Storedetails);
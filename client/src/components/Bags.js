import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { Navigate } from 'react-router-dom';
import '../css/bags.css' ;

class Bags extends Component {

    constructor(props){
        super();
        this.state = {
            statusChangeClicked : false  , 
            statusChanged : false 
        }
        

    }
    handleStatusChangeClicked = () => {
        if(this.state.statusChangeClicked) {
            this.setState({
                statusChangeClicked : false 
            }) ; 
            return ;
        }
        this.setState({
            statusChangeClicked : true 
        }) ; 

    }

    changeStatus = (status) => {
        console.log(status) ; 
        if(this.props.bags.bag.status === status)return ;
        let url = "http://localhost:8000/inventory/changeStatus" ; 
        let token = localStorage.getItem('token') ;
        const options =  {
            method : "POST" , 
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${token}`
            } , 
            body : JSON.stringify({
                status : status , 
                uuid : this.props.bags.bag.uuid , 
                inventory : this.props.bags.bag.inventory
            })
        }
        fetch(url , options)
        .then(res => res.json())
        .then((data) => {
             console.log(data) ;
             this.setState({
                statusChangeClicked : false  , 
                statusChanged : true , 
                goBackToStore : false 
             }) ; 
        })
    }

    goBackToStore = () => {
        this.setState({
            goBackToStore : true 
        })
    }
    render() {
        let bag = this.props.bags.bag ;
        let color = "" ; 
        let size = "" ; 
        let uuid = "" ; 
        let weight = "" ;
        let status = "" ; 
        if(bag){
            color = bag.color ; 
            size = bag.size ; 
            uuid = bag.uuid ; 
            weight = bag.weight ; 
            if(bag.status === 0){
                status = "Damaged" ;
            }else if(bag.status === 1){
                status = "Repairing"
            }else{
                status = "Ready" ;
            }
        }
        if(this.state.statusChanged || this.state.goBackToStore){
            return <Navigate to='/storeDetails'/>
        }
        return (
            <div className='bagdetails'>
                <div className='bagdetails-timeline'>
                      <div className='bagdetails-timeline-traveller'>{status}</div>
                      <div className='bagdetails-timeline-traveller'
                         onClick={() => this.goBackToStore()}>Back To Store</div>
                </div>
                <div className='bagdetails-detail'>
                    <div className='bagdetails-detail-description'>
                        UUID :- {uuid}
                    </div>
                    <div className='bagdetails-detail-description'>
                        SIZE(CC) :- {size}
                    </div>
                    <div className='bagdetails-detail-description'>
                        COLOR :- {color}
                    </div>
                    <div className='bagdetails-detail-description'>
                        WEIGHT(grams) :- {weight}
                    </div>
                    <div className='bagdetails-detail-description'>
                        STATUS :- {status}
                    </div>
                </div>
                <div className='bagdetails-changeStatus'>
                     <div className='bagdetails-changeStatus-button'
                          onClick={() => this.handleStatusChangeClicked()}>
                         Change Status 
                        {this.state.statusChangeClicked && <span> To :-</span> }
                        {!this.state.statusChangeClicked && <span> ?</span> }

                    </div>
                     {this.state.statusChangeClicked &&<div
                      onClick={() => this.changeStatus("0")}> Damaged </div>}
                     {this.state.statusChangeClicked &&<div
                     onClick={() => this.changeStatus("1")}> Repair </div>}
                     {this.state.statusChangeClicked &&<div
                     onClick={() => this.changeStatus("2")}> Ready </div>}
                     {this.state.statusChangeClicked &&<div
                     onClick={() => this.changeStatus("3")}> Move Out </div>}

                </div>
            </div>
        );
    }
}

function mapStateToProps({auth , inventory , bags}){
    return {
        inventory , bags
    }
}
export default connect(mapStateToProps)(Bags) ;
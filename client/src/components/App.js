import React, { Component } from 'react';
import {BrowserRouter as Router ,Route, Routes } from 'react-router-dom' ;
import { Home , Login , Signup , Storedetails , Bags} from './index' ;
import '../css/app.css' ;
import { authenticateUser} from '../action/auth' ;
import { fetchInventoryDetail , fetchBagDetail } from '../action/inventory';
import jwt_decode from 'jwt-decode' ; 
import { connect } from 'react-redux' ;

class App extends Component {

  constructor(props){
    super() ;
    const token = localStorage.getItem('token') ;
    const id = localStorage.getItem('storeId') ;
    if(token){
      let user = jwt_decode(token) ;
      props.dispatch(authenticateUser(user)) ;
    }
    if(id){
      props.dispatch(fetchInventoryDetail(id)) ;
    }
    let bagId = localStorage.getItem('BagID') ;
    if(bagId)props.dispatch(fetchBagDetail(bagId)) ;
  }


  
  render() {
    return (
      <Router>
        <div className="app">
          <Routes>
                <Route exact={true} path="/" element={<Home/>} />
                <Route exact={true} path="/login"  element={<Login/>} />
                <Route exact={true} path="/signup" element={<Signup/>} />
                <Route exact={true} path="/storedetails" element={<Storedetails/>} />
                <Route exact={true} path="/bagdetails" element={<Bags/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}



function mapStateToProps({auth}){
  return {
      auth
  }
}

export default connect(mapStateToProps)(App);


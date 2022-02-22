import {
    FETCH_ALL_STORE , FETCH_STORE_DETAIL , FETCH_BAG_DETAIL
} from './actiontypes' ;



export function fetchBagDetail(uuid){
    console.log("In Action", uuid) ;
    return (dispatch) => {
        let url = "http://localhost:8000/inventory/fetchBagDetail" ; 
        let token = localStorage.getItem('token') ;
        const options =  {
            method : "POST" , 
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${token}`
            } ,
            body : JSON.stringify({uuid})
        }
        fetch(url , options)
        .then(res => res.json())
        .then((data) => {
            console.log("BAG details " , data.data.bag) ;
            dispatch(fetchinBagDetailSuccess(data.data.bag));
        })
   }
}

function fetchinBagDetailSuccess(bag){
    return {
        type : FETCH_BAG_DETAIL , 
        bag
    }
}


export function fetchInventoryDetail(id){
    return (dispatch) => {
        let url = "http://localhost:8000/inventory/fetchDetail" ; 
        let token = localStorage.getItem('token') ;
        const options =  {
            method : "POST" , 
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${token}`
            } ,
            body : JSON.stringify({id})
        }
        fetch(url , options)
        .then(res => res.json())
        .then((data) => {
            console.log(data) ;
            dispatch(fetchingDetailSuccess(data.data.store));
        })
   }
}

function fetchingDetailSuccess(store){
   return {
       type : FETCH_STORE_DETAIL ,
       store 
   }
}


//fetchign all inventories
export function fetchAllStore(){
    return (dispatch) => {
        let url = "http://localhost:8000/inventory/fetchAllStore" ; 
        let token = localStorage.getItem('token') ;
        const options =  {
            method : "GET" , 
            headers : {
                'Content-Type' : 'application/json' , 
                Authorization : `Bearer ${token}`
            } ,
        }
        fetch(url , options)
        .then(res => res.json())
        .then((data) => {
            dispatch(fetchingAllSuccess(data.data.stores))
        })
   }
}

function fetchingAllSuccess(stores){
    return {
        type : FETCH_ALL_STORE , 
        stores 
    }
}



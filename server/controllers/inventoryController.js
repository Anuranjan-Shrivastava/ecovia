const inventory = require('../models/inventory') ;
const ecovian = require('../models/ecovians') ;
const bag = require('../models/bags') ;
const { v4: uuidv4 } = require('uuid');

module.exports.addStore = async function(req , res){
    console.log("Add Store req rec") ;
    let ecovianId = req.user._id ;
    
    let newStore = await inventory.create({
        name : req.body.name , 
        address : req.body.addr ,
        city : req.body.city , 
        state : req.body.state , 
        country : req.body.country , 
        totalItemPresent : 0  , 
        totalItemMovedOut : 0  , 
        damaged : [] ,
        ready : [] ,
        repair : []
    }) ;
  
    if(newStore){
          let newStoreId = newStore._id ;
          let owner = await ecovian.findOne({_id : ecovianId}) ;
          owner.inventoryStore.push(newStoreId) ;
          owner.markModified('inventoryStore') ;
          await owner.save() ;
          return res.status(200).json({
              data : {
                  message : "Store Added"
              }
          })
    }
    return res.status(400).json({
        data : {
            message : "Can not add Store"
        }
    })
}
module.exports.fetchAllStore = async function(req , res){
    console.log("fetchAllStore req rec") ;
    let ecovianId = req.user._id ;
    let owner = await ecovian.findOne({_id : ecovianId}) ;
    let allInventoryStores = owner.inventoryStore ;
    let inventoryDetails = [] ;
    for(let i = 0 ; i < allInventoryStores.length ; i++){
        let id = allInventoryStores[i] ;
        let store = await inventory.findOne({_id : id}) ;
        let storeObj = {} ;
        storeObj.name = store.name ;
        storeObj.addr = store.address ; 
        storeObj.city = store.city ;
        storeObj.state = store.state ; 
        storeObj.country = store.country ;
        storeObj.id = store._id ;
        inventoryDetails.push(storeObj) ;
    }
    return res.status(200).json({
        data : {
            message : "Fetched" , 
            stores : inventoryDetails
        }
    })
}

module.exports.fetchDetail = async function(req , res){
    console.log("Fetch Detail Req Received") ;
    let storeId = req.body.id ; 
    let store = await inventory.findOne({_id : storeId}) ;
    return res.status(200).json({
        data : {
            store : store 
        }
    })
}


module.exports.addBag = async function(req , res){
    console.log("Add Bag Req Rec") ;
    console.log(req.body);
    let targetinventory = await inventory.findOne({_id : req.body.inventoryId}) ;
    let newBag = await bag.create({
        size : req.body.size , 
        color : req.body.color ,
        weight : req.body.weight , 
        uuid : uuidv4() , 
        status : 0 , 
        inventory : req.body.inventoryId 
    }) ; 
    let newBagObj = {
        uuid : newBag.uuid , 
        date : newBag.createdAt 
    }
    targetinventory.damaged.push(newBagObj) ;
    targetinventory.markModified('damaged') ;
    await targetinventory.save() ;
    targetinventory.totalItemPresent += 1 ; 
    await targetinventory.save() ;

    return res.status(200).json({
        data : {
            message : "Bag Added"
        }
    })
}

module.exports.fetchBagDetail = async function(req , res){
    console.log("Fetch Bag Detail Req Received") ;
    let BagId = req.body.uuid ; 
    let reqBag = await bag.findOne({ uuid : BagId}) ;
    return res.status(200).json({
        data : {
            bag : reqBag 
        }
    })
}

module.exports.changeStatus = async function(req , res){
    console.log(req.body) ;
    let reqbag = await bag.findOne({uuid : req.body.uuid}) ;
    let ownerInventory = await inventory.findOne({_id : req.body.inventory}) ;
    let currentStatus = reqbag.status ; 
    let changeStatusTo = req.body.status ;
    console.log(currentStatus , changeStatusTo) ;
    if(currentStatus === 0){
       console.log("damaged")
       let index = ownerInventory.damaged.findIndex(obj => obj.uuid === req.body.uuid) ;
       ownerInventory.damaged.splice(index , 1) ;
       ownerInventory.markModified('damaged') ;
       await ownerInventory.save() ;
    } else if(currentStatus === 1){
        console.log("repair")
        let index = ownerInventory.repair.findIndex(obj => obj.uuid === req.body.uuid) ;
        ownerInventory.repair.splice(index , 1) ;
        ownerInventory.markModified('repair') ;
        await ownerInventory.save() ;
    }else{
        console.log("ready")
        let index = ownerInventory.ready.findIndex(obj => obj.uuid === req.body.uuid) ;
        ownerInventory.ready.splice(index , 1) ;
        ownerInventory.markModified('ready') ;
        await ownerInventory.save() ;
    }
    let bagObj = {
        uuid : req.body.uuid 
    }
    if(changeStatusTo === "0"){ 
        console.log("To damaged") ;
        ownerInventory.damaged.push(bagObj) ;
        ownerInventory.markModified('damaged') ;
        await ownerInventory.save() ;
     } else if(changeStatusTo === "1"){
         console.log("To repair")
        ownerInventory.repair.push(bagObj) ;
        ownerInventory.markModified('repair') ;
        await ownerInventory.save() ;
     }else if(changeStatusTo === "2" ){
         console.log("To ready") ;
        ownerInventory.ready.push(bagObj) ;
        ownerInventory.markModified('ready') ;
        await ownerInventory.save() ;
     }else {
        console.log("To Move out") ; 
        ownerInventory.totalItemMovedOut += 1 ; 
        ownerInventory.totalItemPresent -= 1  ;
        await ownerInventory.save() ;
     }

     reqbag.status = changeStatusTo ; 
     await reqbag.save() ;
    


    return res.status(200).json({
        data : {
            message : "Status Changed"
        }
    })
}
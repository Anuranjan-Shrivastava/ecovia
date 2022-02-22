const express = require('express') ;
const router = express.Router() ;
const passport = require('passport') ;
const inventoryController = require('../controllers/inventoryController') ;

router.post('/addStore' ,passport.authenticate('jwt',{session : false}) ,  inventoryController.addStore) ;
router.get('/fetchAllStore' ,passport.authenticate('jwt',{session : false}),  inventoryController.fetchAllStore) ;
router.post('/fetchDetail' , passport.authenticate('jwt',{session : false}),inventoryController.fetchDetail) ;
router.post('/addBag' ,  passport.authenticate('jwt',{session : false}), inventoryController.addBag) ;
router.post('/fetchBagDetail' ,passport.authenticate('jwt',{session : false}),inventoryController.fetchBagDetail ) ;
router.post('/changeStatus' , passport.authenticate('jwt',{session : false}), inventoryController.changeStatus) ;
module.exports = router ;
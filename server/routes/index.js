const express = require('express') ;
const router = express.Router() ;



router.use('/user' , require('./user')) ;
router.use('/inventory' , require('./inventory')) ;

module.exports = router ;
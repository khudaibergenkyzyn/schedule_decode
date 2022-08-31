const express = require('express');
const router = express.Router();
const {getRooms} = require('../controllers/room.controller')

router.get('/api/rooms' , async (req , res) => {
    try{
        const rooms = await getRooms()
        // groups = timeConverter(groups)
        res.status(200).send(rooms)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router
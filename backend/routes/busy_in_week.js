const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/is-empty');
const {createBusyInWeekValidtor} = require('../validations/busy_in_week.validations');
const {createBusyInWeek , updateBusyInWeek , deleteBusyInWeek} = require('../controllers/busy_in_week.controller');
router.post('/api/busy-in-week' , async (req , res) => {
    const errors = createBusyInWeekValidtor(req.body)
    if(isEmpty(errors)){
        try{
            const busyInWeek = await createBusyInWeek(req.body)
            res.status(200).send(busyInWeek)
        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(errors)
    }
})

router.put('/api/busy_in_week' , async(req , res) => {
    try{
        const busy_in_week = await updateBusyInWeek(req.body)
        res.status(200).send(busy_in_week)
    }catch(error){
        res.status(400).send(error)
    }
})
router.delete('/api/busy_in_week/id' , async(req , res) => {
    try{
        await deleteBusyInWeek(req.params.id)
        res.status(200).end()
    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router
const express = require('express');
const router = express.Router();
const {isEmpty} = require('../utils/is-empty');
const {createLessonInWeekValidtor} = require('../validations/lesson_in_week.validations')
const {createLessonInWeek , updateLessonInWeek , deleteLessonInWeek} = require('../controllers/lesson_in_week.controller');
router.post('/api/lesson-in-week' , async (req , res) => {
    const errors = createLessonInWeekValidtor(req.body)
    if(isEmpty(errors)){
        try{
            const lessonInWeek = await createLessonInWeek(req.body)
            res.status(200).send(lessonInWeek)
        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(400).send(errors)
    }
})
router.put('/api/lesson_in_week' , async(req , res) => {
    try{
        const lesson_in_week = await updateLessonInWeek(req.body)
        res.status(200).send(lesson_in_week)
    }catch(error){
        res.status(400).send(error)
    }
})
router.delete('/api/lesson_in_week/:id' , async(req , res) => {
    try{
        await deleteLessonInWeek(req.params.id)
        res.status(200).end()
    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router
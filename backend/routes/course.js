const express = require('express');
const router = express.Router();
const {getCourses} = require('../controllers/course.controller')

router.get('/api/courses' , async (req , res) => {
    try{
        const courses = await getCourses()
        // groups = timeConverter(groups)
        res.status(200).send(courses)
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = router
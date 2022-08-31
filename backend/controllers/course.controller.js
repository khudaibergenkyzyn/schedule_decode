const {Course , Sequelize} = require('../models');
const Op = Sequelize.Op
const getCourses = async() => {
    return new Promise(async resolve => {
        const courses = await Course.findAll();
        resolve(courses)
    })
}

module.exports = {
    getCourses
}
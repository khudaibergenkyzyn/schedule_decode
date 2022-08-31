const {Lesson_in_week , Group} = require('../models');

const createLessonInWeek = ({course_id , group_id , room_id , mentor_id , weekday , time}) => {
    return new Promise(async resolve => {
        const LessonInWeek = await Lesson_in_week.create({
            course_id,
            group_id,
            room_id,
            weekday,
            time,
            mentor_id
        }); 
        resolve(LessonInWeek);
    })
}
const getLessons = (key , value , start , end) => {
    return new Promise(async resolve => {
        if(!start){
            const LessonsInWeek = await Lesson_in_week.findAll({
                include: ['mentor' , 'course' , 'room' , {
                    model: Group,
                    as: 'group'
                }],
                where: {[key] : value}
            });
            resolve(LessonsInWeek)
        }else{
            const LessonsInWeek = await Lesson_in_week.findAll({
                include: ['mentor' , 'course' , 'room' , 'group'],
                where: { 
                    [Op.and]: [
                        {[key]: value},
                        {
                            '$group.start' : {
                                [Op.gt] : start
                            }   
                        },
                        {
                            '$group.end' : {
                                [Op.gt] : end
                            }   
                        }
                    ]
                }   
            });
        }
        
    })
}

const updateLessonInWeek = async ({id , weekday , time , room_id , mentor_id}) => {
    return new Promise(async resolve => {
        const lesson_in_week = await Lesson_in_week.update({time , weekday , room_id , mentor_id} ,{where:{id}});
        resolve(lesson_in_week)
    })
}

const deleteLessonInWeek = async id => {
    return new Promise(async resolve => {
        await Lesson_in_week.destroy({where : {id}});
        resolve(true)
    })
}


module.exports = {
    createLessonInWeek,
    getLessons,
    deleteLessonInWeek,
    updateLessonInWeek
}
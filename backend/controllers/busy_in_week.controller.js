const {Busy_in_week} = require('../models');

const createBusyInWeek = ({text , weekday , time , mentor_id}) => {
    return new Promise(async resolve => {
        const busyInWeek = await Busy_in_week.create({
            text,
            weekday,
            time,
            mentor_id
        }); 
        resolve(busyInWeek);
    })
}

const getBusyInWeek = (mentor_id) => {
    return new Promise(async resolve => {
        const busyInWeek = await Busy_in_week.findAll({
            include: ['mentor'],
            where: {mentor_id}
        });
        resolve(busyInWeek)
    })
}

const updateBusyInWeek = async ({id , weekday , time, mentor_id}) => {
    return new Promise(async resolve => {
        const busy_in_week = await Busy_in_week.update({time , weekday , mentor_id} ,{where:{id}});
        resolve(busy_in_week)
    })
}

const deleteBusyInWeek = async id => {
    return new Promise(async resolve => {
        await Busy_in_week.destroy({where : {id}});
        resolve(true)
    })
}


module.exports = {
    createBusyInWeek,
    getBusyInWeek,
    updateBusyInWeek,
    deleteBusyInWeek
}
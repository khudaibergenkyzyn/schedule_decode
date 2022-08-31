import LessonInfo from "./lesson-info"
import BusyInfo from "./busy-info"
import TimeColumn from "./time-column";
import {time , weekDays} from '../../../utils/calendar-info';
import { useState } from 'react';
import Col from "./col";
import Item from "./item";
function Calendar(props) {
    const [width , setWidth] = useState(1400)
    window.addEventListener('resize', function(event){
        setWidth(window.innerWidth)
    })
    // let calendar = [(<TimeColumn key={"timecol"}/>)]
    const {data} = props

    const showItem = function(weekday , t){
        let hour = t.split(' ')
        hour = hour[0]
        let val = data.filter(item => item.time == hour && item.weekday == weekday)
        val = val[0]
        return val && val.course? <LessonInfo 
        course={val.course.name } 
        group={val.group.name} 
        mentor={val.mentor.full_name} 
        room={val.room.number}/> : val 
        && val.text ? <BusyInfo text={val.text}/> : <span></span> 
    }
    // let getTime = 0
    // let startTime = 0
    // const checkTime = function(w){
        // let times = data.filter(item => {

        // })
    //     let times = data.filter(item => item.weekday == w)
    //     console.log(times);
    //     times = times.map(item => {
    //         return +(item.time.split(':')[0])
    //     })
    //     if(times.length>0){
    //         startTime = Math.min(...times)
    //         startTime = startTime + ' : 00'
    //         getTime = Math.max(...times)
    //         getTime = getTime + ' : 00'
    //     }
        
    // }
    let calendar = weekDays.map(weekday => {
        let showTime = [(<Item key={0}>{weekday} </Item>)]
        showTime = showTime.concat(time.map((t , i) => {
            // checkTime(weekday)
            // console.log(startTime);
            // while(t >= startTime && t <= getTime){
                return <Item key={i+1} time={t}>{showItem(weekday , t)}</Item>
            // }
            
        }))
        return (<Col key={weekday}>{showTime}</Col>)
    });
    return (
      <div className="calendar">
          {calendar}
      </div>
    );
  }
  
  export default Calendar;
  
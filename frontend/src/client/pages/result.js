import Search  from "../components/search";
import Calendar from "../components/calendar";
import {useEffect , useState} from 'react'
import {useParams , useLocation} from 'react-router-dom'
import axios from "axios";
import moment from 'moment'
import {BASE_URL} from '../../config/baseurl'
function Result({queryname}) {
  const {id} = useParams()
  const [data , setData] = useState([])
  const location = useLocation()
  const getData = (w) => {
    let week = w ? w : moment(new Date()).week()
    axios.get(`${BASE_URL}/api/search?${queryname}=${id}&week=${week}`)
    .then(res => {
      setData(res.data)
      console.log(data);
    })
  }
  const onChangeWeek = (date, dateString) => {
    getData(date.week())
  };
  useEffect(getData , [])
    return (
      <div className="result">
        <Search flexDirection="row" placeholder="Search by Group , Room , Mentor" filterByWeek="true" onChangeWeek={onChangeWeek}/>
        <Calendar data={data}/>
      </div>
    );
  }
  
  export default Result;
  
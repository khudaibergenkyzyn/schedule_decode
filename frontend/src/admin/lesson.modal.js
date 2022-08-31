import moment from 'moment'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {getActiveGroups} from '../store/actions/groupActions';
import {getCourses} from '../store/actions/courseActions';
import {getRooms} from '../store/actions/roomActions'
import {getMentors} from '../store/actions/mentorActions'
import {createLesson} from "../store/actions/lessonActions"
import { useState , useEffect} from 'react';
import {Modal , Input , Button , Select , Tabs , Form} from 'antd'
import { weekDays , time } from '../utils/calendar-info';
import { CloseOutlined} from '@ant-design/icons';
const { Option } = Select;
const { TabPane } = Tabs;
function LessonModal({
    isModalVisible ,
    handleCancel , 
    loading ,
    getActiveGroupsAction , 
    getRoomsAction , 
    getCoursesAction , 
    getMentorsAction , 
    rooms , 
    errors,
    activeGroups ,
    mentors , 
    courses,
    createLessonAction})
    {
    const today = moment()
    const [lessonsInputs , setLessonsInputs] = useState([{
        time: '',
        weekday: ''
    }]);
    const [course_id , setCourse] = useState('');
    const [group_id , setGroup] = useState('')
    const [mentor_id , setMentor] = useState('')
    const [room_id , setRoom] = useState('')
    const[text, setText] = useState("")
    const [end , setEnd] = useState('');
    const[activeTab, setActiveTab]  = useState(1)
    const handleOk = () => {
        if(activeTab == 1){
            createLessonAction({mentor_id, course_id, group_id, room_id, lessonsInputs})
        }
        // else{
        //     createBusyAction({mentor_id, text, lessonsInputs})
        // }   
    };
    const onChange = (key) => {
        setActiveTab(key)
    };
    const onChangeCourse = value => {
        setCourse(value)
    }
    const onChangeGroup = value => {
        setGroup(value)
    }
    const onChangeMentor = value => {
        setMentor(value)
    }
    const onChangeRoom = value => {
        setRoom(value)
    }
    const onChangeWeekday = (index , value) => {
        const list = [...lessonsInputs]
        lessonsInputs[index].weekday = value
        setLessonsInputs(lessonsInputs)
    }
    const onChangeText = (e) =>{
        setText(e.target.value)
    }
    const onChangeTime = (index , value) => {
        const list = [...lessonsInputs]
        list[index].time = value
        setLessonsInputs(list)
    }
    const addLesson = () => {
        setLessonsInputs([...lessonsInputs , {weekday: '' , time: ''}])
    }
    const deleteLesson = (index) => {
        const list = [...lessonsInputs]
        list.splice(index)
        setLessonsInputs(list)
    }
    useEffect(()=>{
        if(!loading && !errors){
          setCourse("")
          setRoom("")
          setMentor("")
          setGroup("")
          setLessonsInputs([{
            time:"",
            weekday:""
          }])
          handleCancel();
        }
      }, [loading])

    useEffect(() => (
        getActiveGroupsAction,
        getMentorsAction,
        getRoomsAction,
        getCoursesAction
    ) , [])
    return(
        <Modal 
        title="Добавление записи" 
        visible={isModalVisible} 
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Сохранить
            </Button>,
            ,
          ]}>

          <Tabs defaultActiveKey="1" onChange={onChange}>
              <TabPane tab="Уроки" key="1">
                  <Form.Item 
                    key={100}
                    validateStatus={errors && errors.course_id ? 'errors' : 'success'} 
                    help={errors && errors.course_id ? errors.course_id : ''}>
                      <Select
                        showSearch
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        placeholder="Search to course"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeCourse}
                      >
                        {courses.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={101}
                    validateStatus={errors && errors.group_id ? 'errors' : 'success'} 
                    help={errors && errors.group_id ? errors.group_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to group"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeGroup}
                      >
                        {activeGroups.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={102}
                    validateStatus={errors && errors.mentor_id ? 'errors' : 'success'} 
                    help={errors && errors.mentor_id ? errors.mentor_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to mentor"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeMentor}
                      >
                        {mentors.map(item => <Option key={item.id} value={item.id}>{item.full_name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={104}
                    validateStatus={errors && errors.room_id ? 'errors' : 'success'} 
                    help={errors && errors.room_id ? errors.room_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        
                        size="large"
                        placeholder="Search to room"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeRoom}
                      >
                        {rooms.map(item => <Option key={item.id} value={item.id}>{item.number}</Option>)}
                      </Select>
                  </Form.Item>
              </TabPane>
              <TabPane tab="Занятость преподавателя" key="2">
                  <Form.Item 
                    key={100}
                    validateStatus={errors && errors.mentor_id ? 'errors' : 'success'} 
                    help={errors && errors.mentor_id ? errors.mentor_id : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Select
                        showSearch
                        size="large"
                        placeholder="Search to mentor"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.includes(input)}
                        filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                        onChange={onChangeMentor}
                      >
                        {mentors.map(item => <Option key={item.id} value={item.id}>{item.full_name}</Option>)}
                      </Select>
                    </Form.Item>
                    <Form.Item 
                    key={101}
                    validateStatus={errors && errors.text ? 'errors' : 'success'} 
                    help={errors && errors.text ? errors.text : ''}
                    style={{
                          width: "100%",
                        }}>
                      <Input size="large" placeholder="Введите комментарий" onChange={onChangeText} value={text} />
                    </Form.Item>
              </TabPane>
            </Tabs>

              {lessonsInputs.map((lessonInput, index) =><div key={index} style={{
                display:"flex",
                justifyContent:"space-between",
                position:"relative"
              }}>
                <Form.Item 
                validateStatus={errors && 
                                errors.lessonInputs && 
                                errors.lessonInputs[index] &&
                                errors.lessonInputs[index].weekday ? 'errors' : 'success'} 
                help={errors && 
                      errors.lessonInputs && 
                      errors.lessonInputs[index] &&
                      errors.lessonInputs[index].weekday ? 'errors' : ''}
                style={{
                      width: "calc(50% - 10px)"
                    }}>
                  <Select
                    showSearch
                    size="large"
                    placeholder="Search to weekdays"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    onChange={(value)=>onChangeWeekday(index, value)}
                  >
                    {weekDays.map((item) => <Option key={item} value={item}>{item}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item 
                validateStatus={errors && 
                  errors.lessonInputs && 
                  errors.lessonInputs[index] &&
                  errors.lessonInputs[index].time ? 'errors' : 'success'} 
                help={errors && 
                      errors.lessonInputs && 
                      errors.lessonInputs[index] &&
                      errors.lessonInputs[index].weekday ? 'errors' : ''}
                style={{
                      width: "calc(50% - 10px)",
                      
                    }}>
                  <Select
                    showSearch
                    
                    size="large"
                    placeholder="Search to time"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    onChange={(value)=>onChangeTime(index, value)}
                  >
                    {time.map((item) =>{ 
                      let t = item.split(" ")
                      t = t[0]
                      return <Option key={t} value={t}>{item}</Option>
                    })}
                  </Select>
                </Form.Item>
                <CloseOutlined 
                  onClick={()=>{deleteLesson(index)}} 
                  style={{
                  color:"#ff0000",
                  position:"absolute",
                  right:"-18px",
                  top:"13px",
                  cursor:"pointer"
                }}/>
          
              </div>)}
            <Button onClick={addLesson}>Add</Button>
          </Modal>
    )
}
const mapDispatchToProps = dispatch => ({
    getActiveGroupsAction: bindActionCreators(getActiveGroups , dispatch),
    getRoomsAction: bindActionCreators(getRooms , dispatch),
    getCoursesAction: bindActionCreators(getCourses , dispatch),
    getMentorsAction: bindActionCreators(getMentors , dispatch),
    createLessonAction:bindActionCreators(createLesson, dispatch)
})
const mapStateToProps = state => ({
    loading: state.groupsReducers.isLoading,
    rooms: state.roomsReducers.rooms,
    courses: state.coursesReducers.courses,
    activeGroups: state.groupsReducers.activeGroups,
    errors:state.lessonReducers.errors,
    mentors: state.mentorsReducers.mentors,
})
export default connect(mapStateToProps , mapDispatchToProps)(LessonModal)
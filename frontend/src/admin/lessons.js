import { Typography , Button , Table, Space} from 'antd';
import { useState , useEffect} from 'react';
import LessonModal from './lesson.modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {deleteMentor} from '../store/actions/mentorActions';
import Input from '../client/components/input';
import { searchLessons , autoCompleteFunc } from '../store/actions/searchActions';
const { Title } = Typography;


function Lessons(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editMentor , setEditMentor] = useState(null)
    const [autoComplete , setAutoComplete] = useState({})
    const [search, setSearch] = useState('')
    const onchange = e => {
        setSearch(e.target.value)
        props.autoCompleteFunc(e.target.value)
    }
    const columns = [
      {
        title: 'Weekday',
        dataIndex: 'weekday',
        key: 'Weekday',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Course',
        dataIndex: 'course',
        key: 'course',
        render: (item) => <a>{item && item.name}</a>,
      },
      {
        title: 'Group',
        dataIndex: 'group',
        key: 'group',
        render: (item) => <a>{item && item.name}</a>,
      },
      {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
        render: (item) => <a>{item && item.number}</a>,
      },
      {
        title: 'Mentor',
        dataIndex: 'mentor',
        key: 'mentor',
        render: (item) => <a>{item && item.full_name}</a>,
      },
      {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Action',
        key: 'action',
        align:'right',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => startEditMentor(record)}>Редактировать</a>
            <a onClick={() => props.deleteMentorAction(record.id)}>Удалить</a>
          </Space>
        ),
      },
    ];
    const startEditMentor = record => {
      showModal();
      setEditMentor(record)
    }

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      setEditMentor(null)
    };
    const onSelectItem = (key , value) => {
        setSearch('')
        props.autoCompleteFunc('')
        props.searchLessonsAction({key , value})

    }
    useEffect(() => {
        props.searchLessonsAction({key: 'room_id' , value:''})
    } , [])
    return(
        <div>
            <div className='page-header'>
                <Title>Расписание</Title>
                <div className='page-header--actions'>
                    <Input onChange={onchange} value={search} data={props.autoCompleteData} onSelectItem={onSelectItem} placeholder="Mentor , Group , Room"/>
                    <Button type="primary" size={'large'} onClick={showModal}>
                        Добавить запись
                    </Button>
                </div>
                
            </div>
            <Table columns={columns} dataSource={props.list} rowKey={item => item.id}/>
            <LessonModal isModalVisible={isModalVisible} handleCancel={handleCancel} mentor={editMentor}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    searchLessonsAction: bindActionCreators(searchLessons , dispatch),
    deleteMentorAction: bindActionCreators(deleteMentor , dispatch),
    autoCompleteFunc: bindActionCreators(autoCompleteFunc , dispatch)
})
const mapStateToProps = state => ({
    list: state.searchReducers.list,
    autoCompleteData: state.searchReducers.autoCompleteData
})
export default connect(mapStateToProps , mapDispatchToProps)(Lessons);
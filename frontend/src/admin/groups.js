import { Typography , Button , Table, Space} from 'antd';
import { useState , useEffect} from 'react';
import GroupModal from './group.modal';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getGroups , deleteGroup} from '../store/actions/groupActions';
const { Title } = Typography;
// const App = () => <Table columns={columns} dataSource={data} />;

function Groups(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editGroup , setEditGroup] = useState(null)
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Action',
        key: 'action',
        align:'right',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => startEditGroup(record)}>Редактировать</a>
            <a onClick={() => props.deleteGroupAction(record.id)}>Удалить</a>
          </Space>
        ),
      },
    ];
    const showModal = () => {
      setIsModalVisible(true);
    };
    const startEditGroup = record => {
      showModal();
      setEditGroup(record)
    }

    const handleCancel = () => {
      setIsModalVisible(false);
      setEditGroup(null)
    };
    useEffect(() => {
        props.getGroupsAction()
    } , [])
    return(
        <div>
            <div className='page-header'>
                <Title>Группы</Title>
                <Button type="primary" size={'large'} onClick={showModal}>
                    Добавить грппу
                </Button>
            </div>
            <Table columns={columns} dataSource={props.groups} rowKey={item => item.id}/>
            <GroupModal isModalVisible={isModalVisible} handleCancel={handleCancel} group={editGroup}/>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    getGroupsAction: bindActionCreators(getGroups , dispatch),
    deleteGroupAction: bindActionCreators(deleteGroup , dispatch)
})
const mapStateToProps = state => ({
    groups: state.groupsReducers.groups
})
export default connect(mapStateToProps , mapDispatchToProps)(Groups);
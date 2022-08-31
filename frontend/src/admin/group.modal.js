import moment from 'moment'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { createGroup , updateGroup} from '../store/actions/groupActions';
import { useState , useEffect} from 'react';
import {Modal , Input , Button , DatePicker, Space} from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;
function GroupModal({group , isModalVisible , handleCancel , loading , createGroupAction , updateGroupAction}){
    const today = moment()
    const [name , setName] = useState('');
    const [start , setStart] = useState('');

    const [end , setEnd] = useState('');
    const handleOk = () => {
        if(group)
            updateGroupAction({id: group.id , name , start: start.toString() , end: end.toString()})
        else
            createGroupAction({name , start , end})
    };
    const onChangeName = e => {
        setName(e.target.value)
    }
    const onChangeStart = (date, dateString) => {
        setStart(date);
    }
    const onChangeEnd = (date, dateString) => {
        setEnd(date);
    }
    useEffect(() => {
        if(group){
            setName(group.name)
            setStart(moment(group.start))
            setEnd(moment(group.end))
        }
    } , [group])
    useEffect(() => {
        if(!loading){
            setName('')
            handleCancel()
        } 
    } , [loading])
    return(
        <Modal 
            title="Добавление группы" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
        ]}>
            <Input size="large" value={name} onChange={onChangeName} placeholder="Введите название группы" prefix={<UsergroupAddOutlined />} />
            <Space direction="vertical" size={12}>
                <DatePicker  value={start} onChange={onChangeStart}/>
                <DatePicker value={end} onChange={onChangeEnd}/>
            </Space>
        </Modal>
    )
}
const mapDispatchToProps = dispatch => ({
    createGroupAction: bindActionCreators(createGroup , dispatch),
    updateGroupAction: bindActionCreators(updateGroup , dispatch)
})
const mapStateToProps = state => ({
    loading: state.groupsReducers.isLoading
})
export default connect(mapStateToProps , mapDispatchToProps)(GroupModal)
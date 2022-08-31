import { useState , useEffect} from 'react';
import { connect } from 'react-redux';
import { createMentor, updateMentor } from '../store/actions/mentorActions';
import {bindActionCreators} from 'redux'
import {Modal , Input , Button} from 'antd'
import { UserOutlined } from '@ant-design/icons';
function MentorModal({mentor , isModalVisible , handleCancel , loading , createMentorAction , updateMentorAction}){
    const [name , setName] = useState('');
    const handleOk = () => {
        if(mentor)
            updateMentorAction({id: mentor.id , name})
        else
            createMentorAction(name)
    };
    useEffect(() => {
        if(mentor)
            setName(mentor.full_name)
    }, mentor)
    const onChange = e => {
        setName(e.target.value)
    }
    useEffect(() => {
        if(!loading){
            setName('')
            handleCancel()
        } 
    } , [loading])
    return(
        <Modal 
            title="Добавление ментора" 
            visible={isModalVisible} 
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    Сохранить
                </Button>,
        ]}>
            <Input size="large" value={name} onChange={onChange} placeholder="Введите имя ментора" prefix={<UserOutlined />}/>
        </Modal>
    )
}
const mapDispatchToProps = dispatch => ({
    createMentorAction: bindActionCreators(createMentor , dispatch),
    updateMentorAction: bindActionCreators(updateMentor , dispatch)
})
const mapStateToProps = state => ({
    loading: state.mentorsReducers.isLoading
})
export default connect(mapStateToProps , mapDispatchToProps)(MentorModal)
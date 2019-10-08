import React from 'react';
import { Form, Input, Modal } from '../antd'
import { addNewItem } from '../../redux/actions/gallaryItems'
import { connect } from "react-redux";

const FormItem = Form.Item;

const enhance = connect(
    ({ gallaryItems }: any) => ({ gallaryItems }),
    { addNewItem }
);

interface IProps {
    visible: boolean;
    addNewItem: any;
    onHandleCloseForm: () => void;
}

interface IState {
    num_comments: number;
    thumbnail: string;
    title: string;
    permalink: string;
}

class AddNewItemForm extends React.Component<IProps, IState> {

    state = {
        num_comments: 0,
        thumbnail: "",
        title: "",
        permalink: "",
    }
    onSave = () => {
        const { num_comments, thumbnail, title, permalink } = this.state;
        this.props.addNewItem({ title: title, num_comments: num_comments, permalink: permalink, thumbnail: thumbnail })
    }

    //TODO поправить дублирование позже
    onHandleChangeTitle = (e: any) => {
        this.setState({ title: e.currentTarget.value })
    }
    onHandleChangeNumComments = (e: any) => {
        this.setState({ num_comments: e.currentTarget.value })
    }
    onHandleChangethumbnail = (e: any) => {
        this.setState({ thumbnail: e.currentTarget.value })
    }
    onHandleChangepermalink = (e: any) => {
        this.setState({ permalink: e.currentTarget.value })
    }

    render() {
        const { onHandleCloseForm, visible } = this.props;
        const { num_comments, permalink, thumbnail, title } = this.state;
        return (
            <Modal
                closable={true}
                visible={visible}
                onOk={this.onSave}
                onCancel={onHandleCloseForm}
            >
                <Form>
                    <FormItem label="Заголовок" required>
                        <Input value={title} onChange={this.onHandleChangeTitle} />
                    </FormItem>
                    <FormItem label="Кол.комментариев" required>
                        <Input value={num_comments} onChange={this.onHandleChangeNumComments} />
                    </FormItem>
                    <FormItem label="url картинки" required>
                        <Input value={thumbnail} onChange={this.onHandleChangethumbnail} />
                    </FormItem>
                    <FormItem label="url статьи" required>
                        <Input value={permalink} onChange={this.onHandleChangepermalink} />
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}


export default enhance(AddNewItemForm);
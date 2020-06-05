import React from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
export default class Rich extends React.Component {

    state = {
        editorState: '',    // 编辑器的状态； 为''时编辑器文字区不展示文字也无法输入文字
        showRichText: false
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        });
    }
    // 获取编辑器文本内容： richContent
    onContentStateChange = (richContent)=>{
        this.setState({
            richContent,
          });
    }

    handleClearContent = ()=>{
        this.setState({
            editorState: ''
        });
    }

    handleGetText = ()=>{
        this.setState({
            showRichText: true
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空文本</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft: 10}}>获取html文本</Button>
                </Card>
                <Card title="富文本编辑器" >
                    <Editor
                        editorState={this.state.editorState}
                        // 编辑器编辑区域是否展示文本事件
                        onEditorStateChange={this.onEditorStateChange}
                        // 文本内容监听事件获取编辑器文本内容
                        onContentStateChange = {this.onContentStateChange}
                    />
                </Card>
                <Modal
                    title="编辑器html内容"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {/* draftToHtml可以将文本内容转换为html标签 */}
                    {draftToHtml(this.state.richContent)}
                </Modal>
            </div>
        );
    }
}
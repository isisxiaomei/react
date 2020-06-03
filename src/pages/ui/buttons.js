import React, { Component } from 'react';
import { Button, Card, Icon, Radio} from 'antd';
import './ui.less';

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

class Buttons extends Component{
  state = {
    isLoading: false,
  };

  handleChange = (e)=>{
    this.setState({
      size: e.target.value
    })
  }
  render(){
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disable>Imooc</Button>
        </Card>
        <Card title="图形按钮" className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button shape="circle" icon="search"></Button>
          <Button type="primary" icon="search">搜索</Button>
          <Button icon="download">下载</Button>
        </Card>
        <Card title="Loading按钮" className="card-wrap">
          <Button type="primary" loading>确定</Button>
          <Button shape="circle" loading></Button>
          <Button loading = {this.state.isLoading} onClick = {()=>{
            this.setState({isLoading: true})} }>点击加载</Button>
          <Button type="danger" loading={this.state.isLoading}>取消</Button>
        </Card>
        <Card title="按钮组" style={{marginBottom: 10}}>
          <ButtonGroup>
            <Button type="primary">
              <Icon type="left"/>
              forward
            </Button>
            <Button type="primary">
              back
              <Icon type="right"/>
            </Button>
          </ButtonGroup>
        </Card>
        <Card title="按钮尺寸" className="card-wrap">
          <RadioGroup onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.size}>Imooc</Button>
          <Button type="danger" size={this.state.size}>Imooc</Button>
        </Card>
      </div>
    );
  }
}
export default Buttons;

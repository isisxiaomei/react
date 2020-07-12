import React from 'react';
import {Input, Select, Form, Button, Checkbox, Radio} from 'antd'
const FormItem = Form.Item;
const Option = Select.Option;

export default {
    formatDate(time){
        if(!time) return '';
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    },
    pagination(data, callback){
        return {
            current: data.result.page,
            pageSize: data.result.pageSize,
            total: data.result.totalCount,
            onChange: (current) => {
                callback(current)
            },
            showTotal: () => {
                return `共${data.result.totalCount}条数据`
            },
            showQuickJumper: true
        };
    },
    getOptionsList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.map((item, index) => {
            options.push(<Option value={item.id} key={index}>{item.name}</Option>);
        });
        return options;
    },

    updateSelectItem(selectedRowKeys, selectedItem, selectedRows){
        this.setState({
            selectedRowKeys,
            selectedItem,
            selectedRows
        });
    }
}
import React from 'react';
import { Form, Card, Button, Select, Table, Modal, Radio, message, DatePicker, Icon, Input } from 'antd';
import Axios from '../../axios/index';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import BaseTable from '../../components/BaseTable';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


export default class BikeMap extends React.Component {
    state = {};
    params = {};
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '深圳' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'orderStatus',
            placeholder: '全部',
            initialValue: '0',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
        },
    ];

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        Axios.ajax({
            url: '/map/bikeList',
            data: {
                params: this.params
            }
        }).then(res => {
            this.setState({
                totalCount: res.result.totalCount
            });
            this.renderMap(res);
        });
    }

    renderMap = (res) => {
        let routerList = res.result.routerList;
        this.map = new window.BMapGL.Map("container");
        let gps1 = routerList[0].split(',');
        let gps2 = routerList[routerList.length - 1].split(',');

        // 绘制起始点和结束点
        let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
        let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
        let startMarker = new window.BMapGL.Marker(startPoint);
        let endMarker = new window.BMapGL.Marker(endPoint);
        this.map.addOverlay(startMarker);
        this.map.addOverlay(endMarker);
        this.map.centerAndZoom(endPoint, 11);

        // 绘制车辆行驶路线
        let trackPoints = routerList.map(item => {
            let temp = item.split(',');
            let trackPoint = new window.BMapGL.Point(temp[0], temp[1]);
            return trackPoint;
        })
        var polyline = new window.BMapGL.Polyline(trackPoints, { strokeColor: "#ef4136", strokeWeight: 2, strokeOpacity: 1 });
        this.map.addOverlay(polyline);

        // 绘制服务区
        let serviceList = res.result.serviceList;
        let servicePointList = [];
        serviceList.forEach(item => {
            servicePointList.push(new window.BMapGL.Point(item.lon, item.lat));
        })

        var servicePolyline = new window.BMapGL.Polyline(servicePointList, { strokeColor: "#ef4136", strokeWeight: 3, strokeOpacity: 1 });
        this.map.addOverlay(servicePolyline);

        // 添加自行车分布点
        let bikeList = res.result.bikeList;

        bikeList.forEach(item => {
            let temp = item.split(",");
            let point = new window.BMapGL.Point(temp[0], temp[1]);
            let bikeMarker = new window.BMapGL.Marker(point);
            this.map.addOverlay(bikeMarker);
        })
    }

    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }


    render() {

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <div>共{this.state.totalCount}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        );
    }
}


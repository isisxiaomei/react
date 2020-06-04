import React from 'react';
import { Form, Card, Button, Select, Table, Modal, Radio, message, DatePicker } from 'antd';
import Axios from '../../axios/index';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class Detail extends React.Component {
    state = {};
    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId);
        }
    }

    // 获取订单详情
    getDetailInfo = (orderId) => {
        Axios.ajax({
            url: '/order/detail',
            data: {
                param: {
                    orderId: orderId
                }
            }
        }).then(res => {
            this.setState({
                orderInfo: res.result
            });
            this.renderMap(res.result);
        });
    }

    // 渲染地图
    renderMap = (result) => {
        // 创建地图实例
        this.map = new window.BMapGL.Map("orderDetailMap");
        // 初始化地图，设置中心点坐标(可以是坐标点对象，也可以是城市，具体参考方法)和地图缩放级别
        this.map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);
        // 设置地图控件
        this.addMapControl();

        // 绘制用户的行驶路线
        this.drawBikeRoute(result.positionList);
        // 绘制可骑行区域
        this.drawArea(result.areaList);
    }

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMapGL.BMAP_ANCHOR_TOP_RIGHT }));
        map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMapGL.BMAP_ANCHOR_TOP_RIGHT }));
    }

    // 绘制用户的行驶路线
    drawBikeRoute = (positionList) => {
        // 起始结束位置打点
        let map = this.map;
        let startPoint = '';
        let endPoint = '';
        if (positionList.length > 0) {
            let startPosition = positionList[0]
            let endPosotion = positionList[positionList.length - 1];
            startPoint = new window.BMapGL.Point(startPosition.lon, startPosition.lat);
            endPoint = new window.BMapGL.Point(endPosotion.lon, endPosotion.lat);
            let startMarker = new window.BMapGL.Marker(startPoint);
            let endMarker = new window.BMapGL.Marker(endPoint);
            map.addOverlay(startMarker);
            map.addOverlay(endMarker);
        }

        // 连接起始结束间路线
        let trackPoints = positionList.map(item => {
            let trackPoint = new window.BMapGL.Point(item.lon, item.lat);
            return trackPoint;
        })
        var polyline = new window.BMapGL.Polyline(trackPoints, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
        map.addOverlay(polyline);


        // 将用户的终点作为地图的中心
        this.map.centerAndZoom(endPoint, 11);
    }

    // 绘制可骑行区域
    drawArea = (areaList) => {
        if (areaList.length > 0) {
            let areaPoints = areaList.map(item => {
                return new window.BMapGL.Point(item.lon, item.lat);
            });
            var polygon = new window.BMapGL.Polygon(areaPoints, { 
                strokeColor: "blue", 
                strokeWeight: 2, 
                strokeOpacity: 0.5,
                fillColor: '#ff8605'
            });
            this.map.addOverlay(polygon);
        }
    }




    render() {
        let info = this.state.orderInfo ? this.state.orderInfo : {};

        return (
            <div>
                <Card>
                    <div id="orderDetailMap" style={{ height: 450 }}></div>
                    <div className="detail-iterms">
                        <div className="iterm-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.orderSn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bikeSn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.userName}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-iterms">
                        <div className="iterm-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.startLocation}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶终点</div>
                                <div className="detail-form-content">{info.endLocation}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance / 1000}公里</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}

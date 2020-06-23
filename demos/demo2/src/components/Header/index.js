import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Utils from '../../utils/utils';
import Axios from '../../axios/index';
import { connect} from "react-redux";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            time: ''
        };
    }
    componentWillMount() {
        this.setState({
            userName: '乐仔'
        });
        setInterval(() => {
            let time = Utils.formatDate(new Date());
            this.setState({
                time: time
            });
        }, 1000);
        this.getWeatherAPIData();
    }

    getWeatherAPIData = () => {
        let city = encodeURIComponent("北京")
        Axios.jsonp({
            url: `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=859d16285fd000feec89e9032513f8bb`
        }).then((res) => {
            let data = res.results[0].weather_data[0];
            this.setState({
                weather: data.weather,
                dayPictureUrl: data.dayPictureUrl,
                nightPictureUrl: data.nightPictureUrl
            });
        }).catch(e => {
        })
    }
    render() {
        let menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? <Col span={6}>
                            <img src="../../resources/logo.png" alt="图片加载失败"/>
                            <span>IMooc 通用管理系统</span>
                        </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : <Row className="header-bottom">
                        <Col span={4} className="header-bottom-title">
                            {this.props.menuName}
                        </Col>
                        <Col span={20} className="time-weather">
                            <span className="date">{this.state.time}</span>
                            <span className="weather-img">
                                <img src={this.state.nightPictureUrl} />
                            </span>
                            <span className="weather-detail">
                                {this.state.weather}
                            </span>
                        </Col>
                    </Row>
                }

            </div>
        );
    }
}

let stateToProps = (state)=>{
    return {
        menuName: state.menuName
    }
}


export default connect(stateToProps)(Header);
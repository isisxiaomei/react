import React from 'react'
import {Card} from 'antd'
// 按需加载
import echarts from 'echarts/lib/echarts'
// 导入柱形图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import echartsTheme from '../echartsTheme'

export default class Line extends React.Component{

    componentWillMount(){
        // 这里使用官方主题所以option里面不要再配置color
        echarts.registerTheme('infographic', echartsTheme);
    }


    getOption = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            // 副标题
            legend: {
                // 这里的data和series的data数据项的name关联起来才会展示
                data: ['OFO', '摩拜', '小蓝']
            },
            // 鼠标放上去的提示
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    name: 'OFO',
                    type: 'line',
                    data: [10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name: '摩拜',
                    type: 'line',
                    data: [100, 10, 200, 500, 600, 700, 100]
                },
                {
                    name: '小蓝',
                    type: 'line',
                    data: [120, 520, 250, 300, 330, 400, 100],
                },

            ]
        }
        return option
    }
    getOption2 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            // 副标题
            legend: {
                // 这里的data和series的data数据项的name关联起来才会展示
                data: ['OFO', '摩拜', '小蓝']
            },
            // 鼠标放上去的提示
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    name: 'OFO',
                    type: 'line',
                    data: [10, 52, 200, 334, 390, 330, 220],
                    areaStyle: {}
                },
                {
                    name: '摩拜',
                    type: 'line',
                    data: [100, 10, 200, 500, 600, 700, 100],
                    areaStyle: {}
                },
                {
                    name: '小蓝',
                    type: 'line',
                    data: [120, 520, 250, 300, 330, 400, 100],
                    areaStyle: {}
                },

            ]
        }
        return option
    }
    render(){
        return(
        <div>
            <Card title="折线图一" >
                {/*  theme：infographic关联导入的 echarts.registerTheme('infographic', echartsTheme);*/}
                <ReactEcharts option={this.getOption()} theme="infographic" style={{height: 500}}/>
            </Card>
            <Card title="折线图二" style={{ marginTop: 10 }}>
                <ReactEcharts option={this.getOption2()} theme="infographic" style={{height: 500}}/>
            </Card>
        </div>
        );
    }
}
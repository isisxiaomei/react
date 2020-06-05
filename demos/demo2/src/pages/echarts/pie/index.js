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

export default class Pie extends React.Component{

    componentWillMount(){
        // 这里使用官方主题所以option里面不要再配置color
        echarts.registerTheme('infographic', echartsTheme);
    }


    getOption = ()=>{
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            // 副标题
            legend: {
                // 这里的data和series的data数据项的name关联起来才会展示
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom: 20
            },
            // 鼠标放上去的提示
            tooltip: {
                trigger: 'item',
                // 用以定义提示框的内容提示格式
                formatter: '{a} </br>{b}: {c}({d}%)'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            name: 'Mon',
                            value: 10,
                        },
                        {
                            name: 'Tue',
                            value: 20,
                        },
                        {
                            name: 'Wed',
                            value: 50,
                        },
                        {
                            name: 'Thu',
                            value: 80,
                        },
                        {
                            name: 'Fri',
                            value: 100,
                        },
                        {
                            name: 'Sat',
                            value: 100,
                        },
                        {
                            name: 'Sun',
                            value: 100,
                        },
                    ]
                },
            ]
        }
        return option
    }
    // 环形图
    getOption2 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                // 这里的data和series的data数据项的name关联起来才会展示
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom: 20
            },
            tooltip: {
                trigger: 'item',
                // 用以定义提示框的内容提示格式
                formatter: '{a} </br>{b}: {c}{d}%）'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    // 内环半径，外环半径
                    radius: ['50%', '80%'],
                    data: [
                        {
                            name: 'Mon',
                            value: 10,
                        },
                        {
                            name: 'Tue',
                            value: 20,
                        },
                        {
                            name: 'Wed',
                            value: 50,
                        },
                        {
                            name: 'Thu',
                            value: 80,
                        },
                        {
                            name: 'Fri',
                            value: 100,
                        },
                        {
                            name: 'Sat',
                            value: 100,
                        },
                        {
                            name: 'Sun',
                            value: 100,
                        },
                    ]
                },
            ]
        }
        return option
    }
    getOption3 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            legend: {
                // 这里的data和series的data数据项的name关联起来才会展示
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                orient: 'vertical',
                right: 10,
                top: 50,
                bottom: 20
            },
            tooltip: {
                trigger: 'item',
                // 用以定义提示框的内容提示格式
                formatter: '{a} </br>{b}: {c}--{d}%'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '80%',
                    roseType: 'radius',
                    data: [
                        {
                            name: 'Mon',
                            value: 10,
                        },
                        {
                            name: 'Tue',
                            value: 20,
                        },
                        {
                            name: 'Wed',
                            value: 50,
                        },
                        {
                            name: 'Thu',
                            value: 80,
                        },
                        {
                            name: 'Fri',
                            value: 100,
                        },
                        {
                            name: 'Sat',
                            value: 100,
                        },
                        {
                            name: 'Sun',
                            value: 60,
                        },
                    ].sort((a, b) => a.value-b.value)
                },
            ]
        }
        return option
    }

    
    
    render(){
        return(
        <div>
            <Card title="饼图一" >
                {/*  theme：infographic关联导入的 echarts.registerTheme('infographic', echartsTheme);*/}
                <ReactEcharts option={this.getOption()} theme="infographic" style={{height: 500}}/>
            </Card>
            <Card title="饼图二" style={{ marginTop: 10 }}>
                <ReactEcharts option={this.getOption2()} theme="infographic" style={{height: 500}}/>
            </Card>
            <Card title="饼图三" style={{ marginTop: 10 }}>
                <ReactEcharts option={this.getOption3()} theme="infographic" style={{height: 500}}/>
            </Card>
        </div>
        );
    }
}
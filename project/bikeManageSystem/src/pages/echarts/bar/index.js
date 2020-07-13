import React from 'react'
import {Card} from 'antd'
// export default class Bar extends React.Component{
//     say(){
//         console.log("1: ",this)
//         setTimeout(() => {
//             console.log("settimeSay: ", this)
//         }, 1000);
//     }
//     show = ()=>{
//         console.log("2: ", this)
//         setTimeout(() => {
//             console.log("settimeShow: ", this)
//         }, 1000);
//         var aa = {
//             bb: function (){
//                 console.log("3: ",this)
//                 setTimeout(() => {
//                     console.log("aa: ", this)
//                 }, 1000);
//             }
//         }
//         aa.bb();
//     }
// }



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

export default class Bar extends React.Component{

    componentWillMount(){
        // 这里使用官方主题所以option里面不要再配置color
        echarts.registerTheme('infographic', echartsTheme);
    }


    getOption2 = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                // 柱状图这里的data和series的数据项name关联起来才会展示；饼图不一样，具体看文档
                data: ['OFO', '摩拜', '小蓝'],
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // x轴
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },

            // y轴
            yAxis: {
                type: 'value'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    name: 'OFO',
                    // type用于控制是什么形状的图
                    type: 'bar',
                    data: [10, 52, 200, 334, 390, 330, 220]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [100, 10, 200, 500, 600, 700, 100]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [120, 520, 250, 300, 330, 400, 100]
                }
            ]
        }
        return option
    }
    getOption = ()=>{
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // x轴
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },

            // y轴
            yAxis: {
                type: 'value'
            },

            // 数据：备注这个数据的data必须和x轴个数对应起来，y轴的刻度会自己计算的
            series: [
                {
                    type: 'bar',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
        return option
    }
    render(){
        return(
        <div>
            <Card title="柱形图1" >
                {/*  theme：infographic关联导入的 echarts.registerTheme('infographic', echartsTheme);*/}
                <ReactEcharts option={this.getOption()} theme="infographic" style={{height: 500}}/>
            </Card>
            <Card title="柱形图2" style={{ marginTop: 10 }}>
                <ReactEcharts option={this.getOption2()} theme="infographic" style={{height: 500}}/>
            </Card>
        </div>
        );
    }
}
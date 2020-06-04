import React from 'react'
import {Card} from 'antd'
export default class Bar extends React.Component{
    say(){
        console.log("1: ",this)
        setTimeout(() => {
            console.log("settimeSay: ", this)
        }, 1000);
    }
    show = ()=>{
        console.log("2: ", this)
        setTimeout(() => {
            console.log("settimeShow: ", this)
        }, 1000);
        var aa = {
            bb: function (){
                console.log("3: ",this)
                setTimeout(() => {
                    console.log("aa: ", this)
                }, 1000);
            }
        }
        aa.bb();
    }
}



// // 按需加载
// import echarts from 'echarts/lib/echarts'
// // 导入柱形图
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/markPoint'
// import ReactEcharts from 'echarts-for-react'

// export default class Bar extends React.Component{


//     getOption = ()=>{
//         let option = {
//             color: ['#3398DB'],
//             tooltip: {
//                 trigger: 'axis',
//                 axisPointer: {            // 坐标轴指示器，坐标轴触发有效
//                     type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//                 }
//             },
//             grid: {
//                 left: '3%',
//                 right: '4%',
//                 bottom: '3%',
//                 containLabel: true
//             },
//             xAxis: [
//                 {
//                     type: 'category',
//                     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//                     axisTick: {
//                         alignWithLabel: true
//                     }
//                 }
//             ],
//             yAxis: [
//                 {
//                     type: 'value'
//                 }
//             ],
//             series: [
//                 {
//                     name: '直接访问',
//                     type: 'bar',
//                     barWidth: '60%',
//                     data: [10, 52, 200, 334, 390, 330, 220]
//                 }
//             ]
//         }
//         return option
//     }
//     render(){
//         return(
//         <div>
//             <Card title="柱形图1">
//                 <ReactEcharts option={this.getOption()} theme=""/>
//             </Card>
//             <Card title="柱形图2" style={{ marginTop: 10 }}>

//             </Card>
//         </div>
//         );
//     }
// }
<template>
    <div :id="id" :style="{width,height}"></div>
</template>
<script>
    import echarts from "echarts"
    export default{
        props:["width","height","id"],
        mounted(){
            this.dataformGragh2();
        },
        methods: {
            dataformGragh2(){
                let myChart2 = echarts.init(document.getElementById(this.id));
                var data = [["2019-11-03",80],["2019-11-04",80],["2019-11-05",80],["2019-11-06",80],["2019-11-07",80],["2019-11-08",80],["2019-11-09",80],["2019-11-10",80],["2019-11-11",80],["2019-11-12",80],["2019-11-13",80],["2019-11-14",80],["2019-11-15",80],["2019-11-16",80],["2019-11-17",80],["2019-11-18",80],["2019-11-19",80],["2019-11-20",80],["2019-11-21",80],["2019-11-22",80],["2019-11-23",80],["2019-11-24",90]];

                var dateList = data.map(function (item) {
                    return item[0];
                });
                var valueList = data.map(function (item) {
                    return item[1];
                });
                var Option1={
                    // Make gradient line here
                    visualMap: [{
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 0,
                        max: 400
                    }, {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 1,
                        dimension: 0,
                        min: 0,
                        max: dateList.length - 1
                    }],


                    title: [{
                        left: 'center',
                        text: '系统识别率随时间变化曲线1',
                        textStyle:{
                            //文字颜色
                            color:'black',
                            //字体风格,'normal','italic','oblique'
                            fontStyle:'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight:'normal',
                            //字体系列
                            fontFamily:'sans-serif',
                            //字体大小
                            fontSize:16

                        }
                    }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [{
                        data: dateList,
                        boundaryGap: false,
                    }],
                    yAxis: [{
                        splitLine: {show: false},
                        type: 'value',
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            formatter: '{value} %'
                        },
                        show: true
                    }],
                    grid: [{
                        bottom: '20%',left: '8%',right: '8%'
                    }],
                    series: [{
                        type: 'line',
                        boundaryGap: false,
                        showSymbol: false,
                        data: valueList,
                        itemStyle : {
                            normal : {
                                color:'#45B1C2', //改变折线点的颜色
                                lineStyle:{
                                    color:'#45B1C2', //改变折线颜色,
                                    width:0.9// 0.1的线条是非常细的了
                                }
                            }
                        },
                        areaStyle: {

                            normal: {

                                color: {

                                    type: 'linear',//设置线性渐变

                                    x: 0,

                                    y: 0,

                                    x2: 0,

                                    y2: 1,

                                    colorStops: [{

                                        offset: 0, color:'#45B1C2'
                                        // 0% 处的颜色

                                    }, {

                                        offset: 1, color:'#FFFFFF'
                                        // 100% 处的颜色

                                    }],

                                    globalCoord: false // 缺省为 false

                                },

                            }

                        },
                    }]
                };
                myChart2.setOption(Option1);
            }
        }
    }
</script>
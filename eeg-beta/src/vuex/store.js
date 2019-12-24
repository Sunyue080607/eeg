import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        graghArr:[["2000-07-03",61],["2000-07-04",72],["2000-07-05",78],["2000-07-06",84],["2000-07-07",85],["2000-07-08",86],["2000-07-09",87],["2000-07-10",88],["2000-07-11",89],["2000-07-12",90],["2000-07-13",91],["2000-07-14",92],["2000-07-15",93],["2000-07-16",94],["2000-07-17",99],["2000-07-18",98],["2000-07-19",97],["2000-07-20",93],["2000-07-21",91],["2000-07-22",97],["2000-07-23",95],["2000-07-24",90]],
        dateListvuex:'',
        valueListvuex:'',
        Optionvuex:'',
        myChart1vuex:'',
        graghArr2:'',
        dateList2vuex:'',
        valueList2vuex:'',
        Option2vuex:'',
        myChart2vuex:'',


        //login
        userId:'',
        username:'',
        authority:'',
        imgurl:'',

        patientname:'',
        patientage:'',
        patientid:'',


    },
    getters:{

    },
    mutations:{
        updatedata(state){
            state.dateListvuex=state.graghArr.map(function (item) {
                return item[0];
            });
            state.valueListvuex=state.graghArr.map(function (item) {
                return item[1];
            });
        },
        updatedataoption(state){
            state.Optionvuex={
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
                    max: state.valueListvuex.length - 1
                }],


                title: [{
                    left: 'center',
                    text: '病人平均检查时间随时间变化曲线1',
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
                    data: state.dateListvuex,
                    boundaryGap: false,
                }],
                yAxis: [{
                    splitLine: {show: false}
                }],
                grid: [{
                    bottom: '20%',left: '8%',right: '8%'
                }, {
                    top: '60%'
                }],
                series: [{
                    type: 'line',
                    boundaryGap: false,
                    showSymbol: false,
                    data: state.valueListvuex,
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
            }
        },
        updatemyChart(state,value){
            state.myChart1vuex=value
        },
        updategraghArr(state,value){
            state.graghArr=value
        },
        //图二
        updatedata2(state){
            state.dateList2vuex=state.graghArr2.map(function (item) {
                return item[0];
            });
            state.valueList2vuex=state.graghArr2.map(function (item) {
                return item[1];
            });
        },
        updatedataoption2(state){
            state.Option2vuex={
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
                    max: state.valueList2vuex.length - 1
                }],
                title: [{
                    left: 'center',
                    text: '异常波形识别率变化曲线',
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
                    data: state.dateList2vuex,
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
                }, {
                    top: '60%'
                }],
                series: [{
                    type: 'line',
                    boundaryGap: false,
                    showSymbol: false,
                    data: state.valueList2vuex,
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
            }
        },
        updatemyChart2(state,value){
            state.myChart2vuex=value
        },
        updategraghArr2(state,value){
            state.graghArr2=value
        },



        updateuserId(state,value){
            state.userId=value
        },
        updateusername(state,value){
            state.username=value
        },
        updateauthority(state,value){
            state.authority=value
        },
        updateimgurl(state,value){
            state.imgurl=value
        },
        updatepatientname(state,value){
            state.patientname=value
        },
        updatepatientage(state,value){
            state.patientage=value
        },
        updatepatientid(state,value){
            state.patientid=value
        },



    },
    actions:{
        fetchData(context){
            context.commit("increment");
            context
        }
    }

});

export default store
<template>
    <div :id="id" :style="{width,height}"></div>
</template>
<script>
    import {mapState} from "vuex"
    import echarts from "echarts"
    import {mapMutations} from "vuex"
    import axios from 'axios';
    import GlobalMsg from '../../global_msg.js'

    export default {
        props: ["width", "height", "id"],
        data() {
            return {
                initArr: [],
                index:2,
                startTime:'',
                endTime:''
            }
        },
        mounted() {
            this.getSystemdata()
        },
        computed: {
            ...mapState(["graghArr2", 'myChart2vuex']),
            dateList2: function () {
                return this.graghArr2.map(function (item) {
                    return item[0];
                })
            },
            valueList2: function () {
                return this.graghArr2.map(function (item) {
                    return item[1];
                })
            },
            Option2: function () {
                return {
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
                        max: this.dateList2.length - 1
                    }],
                    title: [{
                        left: 'center',
                        text: ' 异常波形识别率变化曲线',
                        textStyle: {
                            //文字颜色
                            color: 'black',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体系列
                            fontFamily: 'sans-serif',
                            //字体大小
                            fontSize: 16
                        }
                    }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: [{
            
                        data: this.dateList2,
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
                        bottom: '20%', left: '8%', right: '8%'
                    }, {
                        top: '60%'
                    }],
                    series: [{
                        type: 'line',
                        boundaryGap: false,
                        showSymbol: false,
                        data: this.valueList2,
                        itemStyle: {
                            normal: {
                                color: '#45B1C2', //改变折线点的颜色
                                lineStyle: {
                                    color: '#45B1C2', //改变折线颜色,
                                    width: 0.9// 0.1的线条是非常细的了
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

                                        offset: 0, color: '#45B1C2'
                                        // 0% 处的颜色

                                    }, {

                                        offset: 1, color: '#FFFFFF'
                                        // 100% 处的颜色

                                    }],

                                    globalCoord: false // 缺省为 false

                                },

                            }

                        },
                    }]
                }
            },
            myChart2: function () {
                return echarts.init(document.getElementById(this.id));
            }
        },
        methods: {
            ...mapMutations(['updatemyChart2', 'updategraghArr2', 'updatedata2', 'updatedataoption2']),
            getDay:function(num){
                var today = new Date();
                var nowTime = today.getTime();
                var ms = 24*3600*1000*num;
                today.setTime(parseInt(nowTime + ms));
                var oYear = today.getFullYear();
                var oMoth = (today.getMonth() + 1).toString();
                if (oMoth.length <= 1) oMoth = '0' + oMoth;
                var oDay = today.getDate().toString();
                if (oDay.length <= 1) oDay = '0' + oDay;
                return oYear + "-" + oMoth + "-" + oDay;
            },
            getYear:function(num)
            {
                var today = new Date();
                var oYear = today.getFullYear();
                return oYear+num;
            },
            getPreMonthDay:function(monthNum){
                var date=this.getDay(0);
                var dateArr = date.split('-');
                var year = dateArr[0]; //获取当前日期的年份
                var month = dateArr[1]; //获取当前日期的月份
                var day = dateArr[2]; //获取当前日期的日
                var year2 = year;
                var month2 = parseInt(month) - monthNum;
                if (month2 <= 0) {
                    year2 =parseInt(year2) -parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
                    month2 = 12 - (Math.abs(month2) % 12);
                }
                var day2 = day;
                var days2 = new Date(year2, month2, 1);
                days2 = days2.getDate();
                if (day2 > days2) {
                    day2 = days2;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }
                var t2 = year2 + '-' + month2 + '-' + days2;
                return t2;
            },
            //获取系统使用时间级别
            getSystemdata(){
                let that = this;
                let urlx = ''
                let startUsetime
               axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/getInitTime',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据666666666666",res.data.data.StartUseTime);
                    let firstDate = new Date(res.data.data.StartUseTime)
                    let secondDate = new Date()
                    let diff = Math.abs(firstDate.getTime() - secondDate.getTime()) 
                    startUsetime=parseInt(diff / (1000 * 60 * 60 * 24))
                    let ress=res.data.data;
                    console.log("持续了多久呢",startUsetime)
                        //当系统使用时间少于一个月时
                        if(startUsetime<=30){ 
                            that.index = 2
                            that.startTime = that.getDay(-10)
                            that.endTime = that.getDay(-1)
                            urlx = "Day"
                        }
                        else {
                            //当系统使用时间大于一个月少于一年时
                            if(startUsetime<=365){
                                that.index = 1
                                that.startTime = that.getPreMonthDay(5)
                                that.endTime = that.getPreMonthDay(1)
                                urlx = "Month"
                            }
                            //当系统使用时间大于一年时
                            else {
                                that.index = 0
                                that.startTime = that.getYear(-5)+"-01-01"
                                that.endTime = that.getYear(-1)+"-01-01"
                                urlx = "Year"
                            }
                    }
                //获取初始数据
                    this.$axios({
                        method: 'post',
                        url: 'http://'+GlobalMsg.ip+':8080/time/getRecognition'+urlx,
                        data: '&date1=' + that.startTime + '&date2=' + that.endTime,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res => {
                        console.log('——————————————————————————————————————————————————————',res)
                        console.log("怎么回事",that.startTime)
                        //转换数组，处理vue响应问题
                        var transitArr2 = [];
                        //把数据存储到转换数组中
                        for (var i = 0; i < res.data.data.length; i++) {
                            transitArr2.push([res.data.data[i].date, res.data.data[i].recognition])
                        }
                        that.updategraghArr2(transitArr2);
                        that.updatemyChart2(this.myChart2);
                        that.myChart2.setOption(this.Option2);
                    }).catch((error) => {
                        console.log(error);
                    });

                }).catch((error) => {
                    console.log(error);
                });
            },
        }
    }
</script>



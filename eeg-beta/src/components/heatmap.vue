<template>
    <div style="width: 1450px">


        <el-container>
            <el-aside width="950px" style="padding: 0px">
                <el-container>
                    <el-header height="350px" style="padding: 0px" >

                        <div id="container"></div>


                    </el-header>
                    <el-main  style="padding: 0px" >

                        <div id="fft" style="width: 950px;height: 350px"></div>

                    </el-main>
                </el-container>


            </el-aside>


            <el-main style="padding: 0px;margin-left: 50px">


                <el-container>
                    <el-header height="400px" style="padding: 0px">
                        <div id="heatmap" style="width: 400px;height: 350px">
                            <div>
                                <img src="../assets/down.png" alt="" style="z-index: 10">
                                <img src="../assets/up.png" alt="" style="z-index: 999;position:absolute;left: 0">
                            </div>
                        </div>

                    </el-header>
                    <el-main style="padding: 0px">

                        <div style="padding-top: 0px">
<!--                            <span style="margin-left: 30px;font-weight: 800;">今日待就诊病人</span>-->
                            <div id="bar" style="width: 400px;height:350px;"></div>
                        </div>


                    </el-main>
                </el-container>




            </el-main>
        </el-container>
    </div>

</template>
<script>
    import eventBus from "../utils/eventBus";
    import Diagram from "../module/Diagram";
    import axios from 'axios'
    import GlobalMsg from '../global_msg.js'
    import echarts from 'echarts'
    import Heatmap from 'heatmap.js'
    export default {
        name: "heatmap",
        data () {
            return {
                value1:55,
                value2:45,
                value3:35,
                value4:25,
                value5:15,
                value6:5,
                value7:15,
                value8:25,
                value9:35,
                value10:45,
                value11:79,
                value12:45,
                value13:35,
                value14:25,
                value15:15,
                value16:5,
                DELTA:0,
                THETA:0,
                ALPHA:0,
                BETA:0,
                GAMMA:0,
                chart:null,
                flag:1,
                data0:[1,2,3,4,5],
                chart1:null,
                Data1:[],
                Data2:[],
                Data3:[],
                Data4:[],
                Data5:[],
                Data6:[],
                Data7:[],
                Data8:[],
                Data9:[],
                Data10:[],
                Data11:[],
                Data12:[],
                Data13:[],
                Data14:[],
                Data15:[],
                Data16:[],
                flag:1,
                id1:1,
                id2:1,
                id3:0


            }
        },
        methods:{
            //傅里叶变换图
            getOption1(){
                let me = this;
                let  option = {
                    title: {
                        text: 'fft',
                        left: 'left'
                    },
                    xAxis: {
                        min:0,
                        max:250,
                        interval:50,
                        type: 'value',
                        // axisLabel:{show:false},
                        axisTick:{show:false},
                        // axisLine:{show:false},
                        splitLine: {show:false},
                    },
                    yAxis: {
                        // axisLine:{show:false},
                        min:0,
                        max:1,
                        type: 'value',
                        splitLine: {show:false},
                    },
                    series: [
                        {animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data1,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data2,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data3,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data4,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data5,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data6,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data7,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data8,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data9,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data10,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        {animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data11,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data12,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        {animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data13,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        {animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data14,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        { animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data15,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                        {
                            animationDurationUpdate:900,
                            animationDuration:0,
                            data: me.Data16,
                            type: 'line',
                            symbolSize:0,
                            lineStyle:{
                                color:'lightgrey',
                            },
                        },
                    ]
                };
                return option
            },
            //条形能量图
            getOption(){
                var me = this
                let  option = {
                    title: {
                        text: '波形能量占比图',
                        left: 'left'
                    },

                    xAxis: {
                        type: 'category',
                        data: ['DELTA','THETA','ALPHA','BETA','GAMMA']
                    },

                    yAxis: {
                        axisLine: {show: false},
                        min: 0,
                        max: 100,
                        interval: 25,
                        type: 'value',
                    },
                    series: [

                        {
                            data: this.data0,
                            type: 'bar',
                            animationDuration:function (idx) {
                                return 1000;
                            },
                            animationDurationUpdate:1000,

                        }

                    ]
                }
                return option
            }

        },

        mounted() {
            let me=this
            // let dataBrainEnergy = {patientId: "BH20191207004", order: 1 ,num: 1}//eegId startwave waveNum 三个参数待定，问梁琦
            // this.$axios.post('http://'+GlobalMsg.ip+':8080/user/getBrainEnergy',JSON.stringify(dataBrainEnergy))
            //     .then((response) => {
            //         for(let i=0;i<response.data.data.length;i++)
            //         console.log(response.data.data[i][0])
            //
            //     }).catch((error) => {
            //     console.log(error);
            // });

            // let dataBrain = {patientId: "BH20191207004", order: 1 ,num: 100}//eegId startwave waveNum 三个参数待定，问梁琦
            // this.$axios.post('http://'+GlobalMsg.ip+':8080/user/getBrainChannel',JSON.stringify(dataBrain))
            //     .then((response) => {
            //                 for(let i=0;i<response.data.data.length;i++)
            //                  console.log(response.data.data[i])
            //
            //     }).catch((error) => {
            //     console.log(error);
            // });
            // setInterval(
            //     function () {
            //         let datafft = {patientId: "BH20191207004", order: me.id1 ,num: 1}//eegId startwave waveNum 三个参数待定，问梁琦
            //         axios.post('http://'+GlobalMsg.ip+':8080/user/getFFT',JSON.stringify(datafft))
            //             .then((response) => {
            //                 console.log(response.data.data.length)
            //                 for(let j=0;j<50;j++)
            //                 {
            //                     for(let i=0;i<response.data.data.length;i++)
            //                     {
            //                         me.Data1[j]=[j,response.data.data[0][j+250+me.id3*500]];
            //                         me.Data2[j]=[j,response.data.data[1][j+250+me.id3*500]];
            //                         me.Data3[j]=[j,response.data.data[2][j+250+me.id3*500]];
            //                         me.Data4[j]=[j,response.data.data[3][j+250+me.id3*500]];
            //                         me.Data5[j]=[j,response.data.data[4][j+250+me.id3*500]];
            //                         me.Data6[j]=[j,response.data.data[5][j+250+me.id3*500]];
            //                         me.Data7[j]=[j,response.data.data[6][j+250+me.id3*500]];
            //                         me.Data8[j]=[j,response.data.data[7][j+250+me.id3*500]];
            //                         me.Data9[j]=[j,response.data.data[8][j+250+me.id3*500]];
            //                         me.Data10[j]=[j,response.data.data[9][j+250+me.id3*500]];
            //                         me.Data11[j]=[j,response.data.data[10][j+250+me.id3*500]];
            //                         me.Data12[j]=[j,response.data.data[11][j+250+me.id3*500]];
            //                         me.Data13[j]=[j,response.data.data[12][j+250+me.id3*500]];
            //                         me.Data14[j]=[j,response.data.data[13][j+250+me.id3*500]];
            //                         me.Data15[j]=[j,response.data.data[14][j+250+me.id3*500]];
            //                         me.Data16[j]=[j,response.data.data[15][j+250+me.id3*500]];
            //                     }
            //                 }
            //
            //                 me.id3++
            //                 if(me.id3==9) {
            //                     me.id3 = 0
            //                     me.id1++
            //                 }
            //                 console.log(me.Data1)
            //                 me.chart1 = echarts.init(document.getElementById('fft'),'light');
            //                 me.chart1.setOption(me.getOption1())
            //             }).catch((error) => {
            //         });
            //     }
            //     ,1000
            // )


            var heatmapInstance = Heatmap.create({
                container: document.getElementById('heatmap'),
                radius: 60,
                gradient: {
                    // enter n keys between 0 and 1 here
                    // for gradient color customization
                    '.1': '#FFB6C1',
                    '.2': '#FF1493',
                    '.3': '#DC143C'
                }
            })
            var kvArray = [
                {x: 140, y: 50,value:this.value1},
                {x: 250, y: 50,value:this.value2},
                {x: 130, y: 180,value:this.value3},
                {x: 260, y: 180,value:this.value4},
                {x: 80, y: 250,value:this.value5},
                {x: 310, y: 250,value:this.value6},
                {x: 140, y: 305,value:this.value7},
                {x: 250, y: 305,value:this.value8},
                {x: 78, y: 105,value:this.value9},
                {x: 318, y: 105,value:this.value10},
                {x: 150, y: 137,value:this.value11},
                {x: 242, y: 137,value:this.value12},
                {x: 67, y: 180,value:this.value13},
                {x: 330, y: 180,value:this.value14},
                {x: 155, y: 235,value:this.value15},
                {x: 245, y: 235,value:this.value16},
            ];
            var data = {
                max: 10,
                min: 0,
                data: kvArray
            }
                //销毁定时器
            eventBus.$on('endeeg',function () {
                if(me.flag==0)
                {
                    clearInterval(test)
                    me.flag=1
                }

            })
            // 开始定时器
            // eventBus.$on('starteeg',function () {
            //     me.flag=0
            var test=setInterval(function () {
            let datafft = {patientId: "BH20191207004", order: me.id1 ,num: 1}//eegId startwave waveNum 三个参数待定，问梁琦
            axios.post('http://'+GlobalMsg.ip+':8080/user/getFFT',JSON.stringify(datafft))
                .then((response) => {
                    console.log(response.data.data.length)
                    for(let j=0;j<250;j++)
                    {
                        for(let i=0;i<response.data.data.length;i++)
                        {
                            me.Data1[j]=[j,response.data.data[0][j+250+me.id3*500]];
                            me.Data2[j]=[j,response.data.data[1][j+250+me.id3*500]];
                            me.Data3[j]=[j,response.data.data[2][j+250+me.id3*500]];
                            me.Data4[j]=[j,response.data.data[3][j+250+me.id3*500]];
                            me.Data5[j]=[j,response.data.data[4][j+250+me.id3*500]];
                            me.Data6[j]=[j,response.data.data[5][j+250+me.id3*500]];
                            me.Data7[j]=[j,response.data.data[6][j+250+me.id3*500]];
                            me.Data8[j]=[j,response.data.data[7][j+250+me.id3*500]];
                            me.Data9[j]=[j,response.data.data[8][j+250+me.id3*500]];
                            me.Data10[j]=[j,response.data.data[9][j+250+me.id3*500]];
                            me.Data11[j]=[j,response.data.data[10][j+250+me.id3*500]];
                            me.Data12[j]=[j,response.data.data[11][j+250+me.id3*500]];
                            me.Data13[j]=[j,response.data.data[12][j+250+me.id3*500]];
                            me.Data14[j]=[j,response.data.data[13][j+250+me.id3*500]];
                            me.Data15[j]=[j,response.data.data[14][j+250+me.id3*500]];
                            me.Data16[j]=[j,response.data.data[15][j+250+me.id3*500]];
                        }
                    }

                    me.id3++
                    if(me.id3==9) {
                        me.id3 = 0
                        me.id1++
                    }
                    console.log(me.Data1)
                    me.chart1 = echarts.init(document.getElementById('fft'),'light');
                    me.chart1.setOption(me.getOption1())
                }).catch((error) => {
            });

                                let dataBrain = {patientId: "BH20191207004", order: 1 ,num: me.id2}//eegId startwave waveNum 三个参数待定，问梁琦
                                axios.post('http://'+GlobalMsg.ip+':8080/user/getBrainChannel',JSON.stringify(dataBrain))
                                    .then((response) => {
                                        console.log(response)
                                          for(let i=0;i<response.data.data.length;i++)
                                    data.data[i].value=response.data.data[i]
                                         heatmapInstance.setData(data)
                                    }).catch((error) => {
                                    console.log(error);
                                });

                                let dataBrainEnergy = {patientId: "BH20191207004", order: me.id2 ,num: 1}//eegId startwave waveNum 三个参数待定，问梁琦
                                axios.post('http://'+GlobalMsg.ip+':8080/user/getBrainEnergy',JSON.stringify(dataBrainEnergy))
                                    .then((response) => {
                                        console.log(response)
                                      for(let i=0;i<response.data.data.length;i++)
                                    me.data0[i]=response.data.data[i][0]*100
                                me.chart = echarts.init(document.getElementById('bar'),'light')
                                me.chart.setOption(me.getOption())
                                    }).catch((error) => {
                                    console.log(error);
                                });
                                me.id2++
                            },
                            1000
                        )
            // })

        }
    }
</script>

<style scoped>
    #container {
        width: 950px;
        height: 350px;
        background-color: #eee;
    }
</style>


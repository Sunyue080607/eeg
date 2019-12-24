<template>
    <div id="fft" style="width: 950px;height: 350px"></div>
</template>

<script>
    import axios from 'axios'
    import echarts from 'echarts'
    import GlobalMsg from '../global_msg.js'
    export default {
        name: "test3",
        data(){
            return{
                chart:null,
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
            }
        },
        methods:{
            getOption(){
                let me = this;
                let  option = {
                    title: {
                        text: 'fft',
                        left: 'left'
                    },
                    xAxis: {
                        min:0,
                        max:250,
                        interval:25,
                        type: 'value',
                        // axisLabel:{show:false},
                        axisTick:{show:false},
                        // axisLine:{show:false},
                        splitLine: {show:false},
                    },
                    yAxis: {
                        // axisLine:{show:false},
                        min:0,
                        max:10000,
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
            }

        },
        mounted() {
            let me=this;
            setInterval(function () {
                for(let i=0;i<250;i++)
                {
                    me.Data1[i]=[i,Math.random()*10000];
                    me.Data2[i]=[i,Math.random()*10000];
                    me.Data3[i]=[i,Math.random()*10000];
                    me.Data4[i]=[i,Math.random()*10000];
                    me.Data5[i]=[i,Math.random()*10000];
                    me.Data6[i]=[i,Math.random()*10000];
                    me.Data7[i]=[i,Math.random()*10000];
                    me.Data8[i]=[i,Math.random()*10000];
                    me.Data9[i]=[i,Math.random()*10000];
                    me.Data10[i]=[i,Math.random()*10000];
                    me.Data11[i]=[i,Math.random()*10000];
                    me.Data12[i]=[i,Math.random()*10000];
                    me.Data13[i]=[i,Math.random()*10000];
                    me.Data14[i]=[i,Math.random()*10000];
                    me.Data15[i]=[i,Math.random()*10000];
                    me.Data16[i]=[i,Math.random()*10000];
                }
                me.chart = echarts.init(document.getElementById('fft'),'light');
                me.chart.setOption(me.getOption())
            },1000)

        }

    }
</script>

<style scoped>

</style>
<template>
    <div id="eeg" style="width: 1400px;height:750px;"></div>
</template>

<script>
    import axios from 'axios'
    import echarts from 'echarts'
    import GlobalMsg from '../global_msg.js'
    export default {
        name: "eegnew",
        data:function () {
            return {
                range:100,
                totalData:[],
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
                filePath:'http://'+GlobalMsg.ip+':8080/user/getEggData',//测试地址
                yLabels:['Fp1-A1','Fp2-A2','F3-A1','F4-A2'	,'C3-A1','C4-A2','P3-A1','P4-A2','O1-A1','O2-A2','F7-A1','F8-A2','T3-A1','T4-A2','T5-A1','T6-A2',' '],
                chart:null
            }
        } ,

        methods:{
            setIntervals(){
                let that = this
                var j=0
                 let index=0
                for(let i=0;i<1250;i++)
                {
                    that.Data1[i]=[i,that.totalData[0][index]+100];
                    index++;
                }
                that.chart.setOption(that.getOption())

                // setInterval(function () {
                //
                //     that.chart.clear()
                //     for(let i=0;i<1250;i++)
                //     {
                //         that.Data1[i]=[i,that.totalData[0][index]+100];
                //
                //         index++;
                //     }
                //
                //     that.chart.setOption(that.getOption())
                //
                //  },10000)
             },

            getOption(){
                var me = this
                let  option = {
                    title: {
                        text: 'eegtest',
                        left: 'center'
                    },
                    xAxis: {
                        min:0,
                        max:1250,
                        interval:25,
                        type: 'value',
                        // axisLabel:{show:false},
                        axisTick:{show:false},
                        axisLine:{show:false},
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'

                            }
                        },
                    },
                    yAxis: {
                        axisLine:{show:false},
                        min:0,
                        max:1600,
                        interval:100,
                        type: 'value',
                        splitLine: {
                            show:false,
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        axisLabel:{
                            formatter: function (value, index) {
                                return me.yLabels[index];
                            },
                        }
                    },
                    series: [
                       {
                           data: [[125,0],[125,1600]],
                           type: 'line',
                           lineStyle:{
                               color:'#000000',
                           },
                           symbolSize:0
                       },
                        {
                            data: [[250,0],[250,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[375,0],[375,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[500,0],[500,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[625,0],[625,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[750,0],[750,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[875,0],[875,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[1000,0],[1000,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[1125,0],[1125,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },
                        {
                            data: [[1250,0],[1250,1600]],
                            type: 'line',
                            lineStyle:{
                                color:'#000000',
                            },
                            symbolSize:0
                        },

                        {
                            data: me.Data1,
                            type: 'line',
                            lineStyle:{
                                color:'lightgrey',
                            },
                            animation: true,
                            animationThreshold:30000,
                            animationDuration:function (idx) {
                                return 10000;
                            },
                            animationDelayUpdate: function (idx) {
                                return idx * 2;
                            },
                            animationEasing:'linear',

                            symbolSize:0
                        },
                    ]
                }
                return option
            }
        },
        mounted() {
            this.chart = echarts.init(document.getElementById('eeg'),'light')
            let that = this
            axios.get(this.filePath)
                .then((response) => {
                    that.totalData = response.data.data
                    console.log(that.totalData)
                    that.setIntervals()
                }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>

<style scoped>

</style>
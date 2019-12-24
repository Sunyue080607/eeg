<template>
    <div style="background-color: white;height: 331px;margin-top: 10px;padding-top: 20px">
        <div>
            <span style="margin-left: 20px;font-weight: 800">系统统计数据</span>
            <div id="eeg" style="width: 380px;height:200px;"></div>
        </div>
        <div>

                    <div class="flex-container" style="background: #e5e9f2;;margin-left: 20px;margin-right: 20px">
                    <div style="color: gray; font-size: 15px;margin-left: 10px">历史检查人数</div>
                    <div style="font-weight: 600;margin-right: 10px;font-size: 15px" >{{historicalinspectors}}人</div>
                    </div>

                <div class="flex-container" style="background: #e5e9f2;margin-top: 2px;margin-left: 20px;margin-right: 20px">
                    <div style="color: gray; font-size: 15px;margin-left: 10px">人均检查时间</div>
                    <div style="font-weight: 600;margin-right: 10px;font-size: 15px" >{{pertime}}分钟</div>
                    </div>

                <div class="flex-container" style="background: #e5e9f2;margin-top: 2px;margin-left: 20px;margin-right: 20px">
                <div style="color: gray; font-size: 15px;margin-left: 10px">共节省时间</div>
                <div style="font-weight: 600;margin-right: 10px; font-size: 15px" >{{savetime}}小时</div>
                </div>

                <div class="flex-container" style="background: #e5e9f2;margin-top: 2px;margin-left: 20px;margin-right: 20px">
                <div style="color: gray; font-size: 15px;margin-left: 10px">共检测出异常波形</div>
                <div style="font-weight: 600;margin-right: 10px;font-size: 15px">{{abnormalwave}}</div>
                </div>

        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import echarts from 'echarts'
    import GlobalMsg from '../global_msg.js'


    export default {
        name: 'System statistics pie-chart',
        data:function () {
            return {
                filePath:'http://'+GlobalMsg.ip+':8080/home/sysInfo',//测试地址
                orgOptions: {},
                historicalinspectors:'',
                pertime:'',
                savetime:'',
                abnormalwave:'',
                year010:'',
                year1020:'',
                year2050:'',
                year50:'',
                chart:null
            }
        } ,
        methods:{
            getOption(){
                var me = this
                console.log(me.year010)
                let  option = {
                    title : {
                        text: '病人年龄分布图',
                        x:200,
                        y:20,
                        textStyle: {
                            fontSize: 15
                        }
                    },

                    legend: {
                        orient: 'vertical',
                        x: '200px',
                        y:'center',
                        align:'left',
                        data:['0-10岁'+me.year010,'10-20岁','20-50岁','50岁以上']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['0%', '70%'],
                            center: ['25%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'left'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:me.year010, name:'0-10岁'+this.year010},
                                {value:me.year1020, name:'10-20岁'},
                                {value:me.year2050, name:'20-50岁'},
                                {value:me.year50, name:'50岁以上'},

                            ]
                        }
                    ]

                }
                return option
            }




        },

        mounted() {

            let that = this
            axios.get(this.filePath)
                .then((response) => {
                    // console.log(response.data.data)
                    that.historicalinspectors=response.data.data.history
                    that.pertime=response.data.data.average
                    that.savetime=response.data.data.savedTime
                    that.abnormalwave=response.data.data.abWaveNum
                    that.year010=response.data.data.pie.age1
                    that.year1020=response.data.data.pie.age2
                    that.year2050=response.data.data.pie.age3
                    that.year50=response.data.data.pie.age4
                    // console.log(that.year1020)
                    that.chart = echarts.init(document.getElementById('eeg'),'light')
                    that.chart.setOption(this.getOption())

                }).catch((error) => {
                console.log(error);
            });



        }
    }
</script>

<style scoped>
    .flex-container {
        display: flex;
        justify-content: space-between;
    }
</style>
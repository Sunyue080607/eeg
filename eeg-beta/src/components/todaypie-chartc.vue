<template>
    <div style="background-color: white;height: 350px">

        <el-dialog title="病人信息" :visible.sync="dialogFormVisible3" width="30%" >
            <el-form :model="form">
                <el-form-item label="编号" :label-width="formLabelWidth">
                    <span>{{id}}</span>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <span>{{name}}</span>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth">
                    <span>{{old}}</span>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <span>{{gender}}</span>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <span>{{phone}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Clickvideo">确定</el-button>
            </div>
        </el-dialog>

        <div style="padding-top: 20px">
           <span style="margin-left: 30px;font-weight: 800;">今日待就诊病人</span>
            <div id="pie" style="width: 380px;height:200px;"></div>
        </div>
        <div  style="margin-left: 40px;overflow:auto;width:300px;height:150px;z-index: 999;position:absolute;top:370px;"  class="group-list" >
                <el-button @click="Clickvideo2(i)" v-for="(item,i) in sum1" :key="item.patientId" v-if="!item.checkStatus" type="info" size="mini" :disabled="item.checkStatus" :style="selfstyle">{{item.name}}</el-button>
                <el-button  v-for="(item,i) in sum2" :key="item.patientId" v-if="item.checkStatus"  type="info" size="mini" :disabled="item.checkStatus" :style="selfstyle">{{item.name}}</el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import GlobalMsg from '../global_msg.js'
    import echarts from 'echarts'
    import { mapMutations } from "vuex"


    export default {

        name: 'today pie-chart',
        data:function () {
            return {
                selfstyle: {
                   paddingLeft:"5px",
                    color: "black",
                    marginTop: "10px",
                    width: "60px",
                    marginLeft:"10px"
                },
                id:'',
                name:'',
                gender:'',
                old:'',
                phone:'',

                filePath:'http://'+GlobalMsg.ip+':8080/home/getDateDiagnosePatient',//测试地址
                chart:null,
                sum1: [],
                sum2: [],
                orgOptions: {},
                Alreadytreated:'',
                Novisit:'',
                count:1,
                dialogFormVisible3:false,
            }
        } ,
        methods:{
            ...mapMutations(['updatepatientname','updatepatientage','updatepatientid']),
            Clickvideo(){

                this.updatepatientname(this.name)
                this.updatepatientid(this.id)
                this.updatepatientage(this.old)
                this.dialogFormVisible3=false

                this.$router.push({path:'/videoPage/'})
            },
            Clickvideo2(key){
                let me=this
                // //requestparam
                let rconfig={
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/home/getPatientById',
                    data:"&PatientId="+this.sum1[key].patientId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                this.$axios(rconfig)
                    .then((response) => {
                        me.name=response.data.data.name
                        me.gender=response.data.data.gender
                        me.old=response.data.data.old
                        me.phone=response.data.data.phone
                        me.id=response.data.data.patientId
                        this.dialogFormVisible3=true
                    }).catch((error) => {
                    console.log(error);
                });




            },



            getOption(){
                var me = this
                let  option = {
                    series: [
                        {
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize: 15,
                                                }
                                        }
                                    },

                            type: 'pie',

                            radius: ['40%', '50%'],

                            center: ['50%', '40%'],

                            data:[
                                {value:this.Alreadytreated, name:'已就诊'+this.Alreadytreated+"人",itemStyle: {color: '#fead0f'}},
                                {value:this.Novisit, name:'未就诊'+this.Novisit+"人",itemStyle: {color: '#2a89ea'}},
                            ],
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
                    console.log(response.data.data)
                    that.sum1=response.data.data.notCheckPatiet
                    that.sum2=response.data.data.checkedPatient
                    that.Alreadytreated=response.data.data.checkedPatient.length
                    that.Novisit=response.data.data.notCheckPatiet.length

                    that.chart = echarts.init(document.getElementById('pie'),'light')
                    that.chart.setOption(this.getOption())
                }).catch((error) => {
                console.log(error);
            });




        }
    }
</script>

<style scoped>
    .group-list::-webkit-scrollbar {
        width: 4px;
    }
    .group-list::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
    }
</style>
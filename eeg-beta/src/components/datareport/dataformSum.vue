<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <el-card class="box-card" style="width: 390px;height: 140px;padding: 0;display: flex;align-items: center;justify-content: flex-start" >
                <div style="display: flex;align-items: flex-start;justify-content: center">
                    <div style="margin-right: 20px">
                        <img style="width: 70px;height: 70px" src="../../assets/TotalNumber.png"  alt="未找到图片" />
                    </div>
                    <div>
                        <div style="display: flex;align-items: center;justify-content: center">
                            <span>
                                累计检查人数 <span style="font-size: 25px;font-style: italic;font-weight: bold">{{hisinspectorNum}}</span> <span>人</span>
                            </span>
                        </div>
                        <div style="display: flex;align-items: center;justify-content: flex-start;margin-top: 10px;font-size: 14px">
                            <span>
                                今日检查人数<span style="font-size: 18px;font-style: italic;font-weight: bold;color: #2a89ea"> ( +{{todayinspectorNum}} )</span>
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="width: 390px;height: 140px;padding: 0;display: flex;align-items: center;justify-content: flex-start">
                <div style="display: flex;align-items: flex-start;justify-content: center">
                    <div style="margin-right: 20px">
                        <img style="width: 70px;height: 70px" src="../../assets/TotaTime.png"  alt="未找到图片" />
                    </div>
                    <div>
                        <div style="display: flex;align-items: center;justify-content: center">
                            <span>
                                累计使用时间 <span style="font-size: 25px;font-style: italic;font-weight: bold">{{totalUsetime}}</span> <span>小时</span>
                            </span>
                        </div>
                        <div style="display: flex;align-items: center;justify-content: flex-start;margin-top: 10px;font-size: 14px">
                            <span>
                                今日使用时间<span style="font-size: 18px;font-style: italic;font-weight: bold;color: #2a89ea"> ( +{{todayUsetime}} )</span>
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="width: 390px;height: 140px;padding: 0;display: flex;align-items: center;justify-content: flex-start">
                <div style="display: flex;align-items: flex-start;justify-content: center">
                    <div style="margin-right: 20px">
                        <img style="width: 70px;height: 70px" src="../../assets/AverageTime.png"  alt="未找到图片" />
                    </div>
                    <div>
                        <div style="display: flex;align-items: center;justify-content: center">
                            <span>
                                历史平均检查时间 <span style="font-size: 25px;font-style: italic;font-weight: bold">{{hisaveinspectime}}</span> <span>分钟</span>
                            </span>
                        </div>
                        <div style="display: flex;align-items: center;justify-content: flex-start;margin-top: 10px;font-size: 14px">
                            <span>
                                今日平均检查时间<span style="font-size: 18px;font-style: italic;font-weight: bold;color: #2a89ea"> ( +{{todayaveinspectime}} )</span>
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" style="width: 390px;height: 140px;padding: 0;display: flex;align-items: center;justify-content: flex-start">
                <div style="display: flex;align-items: flex-start;justify-content: center">
                    <div style="margin-right: 20px">
                        <img style="width: 70px;height: 70px" src="../../assets/AbnormalWaveform.png"  alt="未找到图片" />
                    </div>
                    <div>
                        <div style="display: flex;align-items: center;justify-content: center">
                            <span>
                                累计识别异常波形 <span style="font-size: 25px;font-style: italic;font-weight: bold"> {{totalAbnorwave}} </span> <span>条</span>
                            </span>
                        </div>
                        <div style="display: flex;align-items: center;justify-content: flex-start;margin-top: 10px;font-size: 14px">
                            <span>
                                今日识别异常波形<span style="font-size: 18px;font-style: italic;font-weight: bold;color: #2a89ea"> ( +{{todayAbnorwave}} )</span>
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import GlobalMsg from '../../global_msg.js'
    export default {
        data() {
            return {
                hisinspectorNum:0,
                todayinspectorNum:0,
                totalUsetime:0,
                todayUsetime:0,
                hisaveinspectime:0,
                todayaveinspectime:0,
                totalAbnorwave:0,
                todayAbnorwave:0
            }
        },
        mounted(){
            this.getdataformdata()
        },
        methods:{
            getdataformdata(){
                //历史平均检查时间今日平均检查时间
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/historyPatientTime',
                    headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    if(res.data.message=="操作成功")
                    this.hisaveinspectime=res.data.data.HistoryAverage;
                    else this.hisaveinspectime=0
                    console.log("拉回的数据1",res);
                }).catch((error) => {
                    console.log(error);
                });
                //今日平均检查时间
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/dayPatientTime',
                    headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据2",res);
                    if(res.data.message=="操作成功")
                    this.todayaveinspectime=res.data.data.CurrentAver;
                    else this.todayaveinspectime=0
                }).catch((error) => {
                    console.log(error);
                });
                //获取系统当前和历史使用时间
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/getTime',
                    headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据3",res);
                    if(res.data.message=="操作成功")
                        this.totalUsetime=res.data.data.HistoryUseTimeHour
                    else this.totalUsetime=0
                    this.todayUsetime=res.data.data.CurrentUseTimeHour
                    console.log("打印当前值",this.todayUsetime,res.data.data.CurrentUseTimeHour,res.data)
                }).catch((error) => {
                    console.log(error);
                });
                //累计检查人数
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/getHistoryPatient',
                    headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据4",res);
                    if(res.data.message=="操作成功")
                        this.hisinspectorNum=res.data.data.countHistoryPatient
                    else this.hisinspectorNum=0
                }).catch((error) => {
                    console.log(error);
                });
                //今日检查人数
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/getDayPatient',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据5",res);
                    if(res.data.message=="操作成功")
                        this.todayinspectorNum=res.data.data.countDayPatient
                    else this.todayinspectorNum=0
                }).catch((error) => {
                    console.log(error);
                });
                //波形
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/getAllErrWaves',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据444444444",res);
                    if(res.status==200){
                        this.totalAbnorwave=res.data.data
                    }
                }).catch((error) => {
                    console.log(error);
                });
                //今日波形
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/time/getTodayErrWaves',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("拉回的数据5555555555",res);
                    if(res.status==200){
                        this.todayAbnorwave=res.data.data
                    }
                }).catch((error) => {
                    console.log(error);
                });

            }
        }

    }
</script>


<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 1px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .el-card__header{
        padding: 10px;
        padding-left: 20px;

    }
    .el-card__body{
        padding: 10px 20px;
    }
</style>
<template>
    <div style="background:white;width: 100%">
        <!--         <div style="display: flex;align-items: center;background: ">-->
        <!--             <div>-->
        <!--                 <i class="arrow" :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="passIscollape"></i>-->
        <!--             </div>-->
        <!--         </div>-->
        <div style="height: 30px;margin-top: 10px;display: flex;align-items:center;width:100%">
            <div style="margin-left: 20px"><span style="font-size:15px;font-weight: 600">时间单位</span></div>
        </div>
        <!-- 时间单位 -->
        <div style="display: flex;justify-content: space-around;margin-top:10px;width:100%">
            <div v-for="i in 3" :key="i">
                <el-tooltip  :disabled="disableTip[i-1]" effect="light" content="暂无数据" placement="right">
                    <div>
                        <button class="btnx" id="btntest1" :disabled="disable[i-1]" :class="{activex:btn[i-1]}" @click="getYearvalue(i)">{{timeScale[i-1]}}</button>
                    </div>
                    
                </el-tooltip>
            </div>
        </div>
        <div style="height: 30px;margin-top: 10px;display: flex;align-items:center;width:100%">
            <div style="margin-left: 20px"><span style="font-size:15px;font-weight: 600">快捷方式</span></div>
        </div>
        <!-- 快捷方式 -->
        <div style="display: flex;justify-content: space-around;margin-top: 10px;height: 40px;width:100%">
            <button v-for="i in 3" :key="i" class="btny" id="btntest1" :class="{activex:but[i-1]}" @click="getScalevalue(i)">{{timeInterval[index][i-1]}}</button>
        </div>

        <div style="width:100%;margin-top: 5px">
            <div style="display: flex;justify-content: center;align-items: center">
                <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="timestart"
                        :type="time"
                        size="mini"
                        range-separator="至"
                        align="right"
                        placeholder="开始日期"
                        :picker-options="pickerOptionstart"
                        style="width: 40%;margin-left:20px;"
                >
                </el-date-picker>
                <div style="display: flex;align-items: center;margin: 0 5px">
                    <span>至</span>
                </div>
                <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="timeend"
                        :type="time"
                        size="mini"
                        range-separator="至"
                        align="right"
                        placeholder="结束日期"
                        style="width: 40%"
                        :picker-options="pickerOptionend"
                >
                </el-date-picker>
                <el-button type="primary" size="mini" @click="comfirmCommit" style="margin-left: 5px;margin-right:20px;height: 25px;width: 50px;display: flex;justify-content: center;align-items: center">
                    <span>确定</span>
                </el-button>

            </div>

            <!--                        <button @click="show" style="height: 40px;width: 100px">测试按钮</button>-->
            <div style="width:100%;margin-top: 10px">
                <el-calendar v-model="value">
                </el-calendar>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import { mapMutations } from "vuex"
    import axios from 'axios';
    import GlobalMsg from '../../global_msg.js'
    export default {
        data() {
            return {
                timeScale:["年","月","日"],
                timeInterval:[["近5年","近10年","近15年"],["近5个月","近10个月","近15个月"],["近10天","近20天","近30天"]],
                btn:[],
                but:[],
                index:2,
                isCollapse: false,
                value: new Date(),
                timestart:"",
                timeend:"",
                time:"",
                timetype:["year","month","date"],
                disable:[],
                disableTip:[],
                startUsetime:"",
                pickerOptionstart: {
                // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
                disabledDate: (time) => {
                    // 如果函数处理比较简单,可以直接在这里写逻辑方法
                    // return time.getTime() < Date.now() - 8.64e7
                    // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
                    return this.dealDisabledDatestart(time)
                    }
                }, // 日期设置对象
                pickerOptionend: {
                // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
                disabledDate: (time) => {
                    // 如果函数处理比较简单,可以直接在这里写逻辑方法
                    // return time.getTime() < Date.now() - 8.64e7
                    // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
                    return this.dealDisabledDateend(time)
                    }
                }, // 日期设置对象
            }
        },
        created(){

        },
        computed:{
            ...mapState(['graghArr','myChart1vuex','Optionvuex','graghArr2','myChart2vuex','Option2vuex']),
            disDate:function(){
                return (new Date(this.startUsetime)).getTime()
            }
        },
        mounted(){
            this.getdataformdata()
        },
        methods: {
            ...mapMutations(['updatedata','updatedataoption','updategraghArr','updatedata2','updatedataoption2','updategraghArr2']),
            // 单独处理开始时间的函数
            dealDisabledDatestart (time) {
            // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
            // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
            // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
            var disDate = (new Date(this.startUsetime)).getTime()
            // console.log("打印结果----------------->",disDate)
            // 这里算出一个月的毫秒数,这里使用30的平均值,实际中应根据具体的每个月有多少天计算
            return time.getTime() > Date.now() || time.getTime() < disDate
            // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
            // return time.getTime() <= Date.now()
            // return time.getTime() < Date.now() - 8.64e7
            },
            // 单独处理结束时间的函数
            dealDisabledDateend (time) {
            // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
            // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
            // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
            // let disDate = (new Date('2017-12-01')).getTime()
            var disDatestart = (new Date(this.timestart)).getTime()
            // 这里算出一个月的毫秒数,这里使用30的平均值,实际中应根据具体的每个月有多少天计算
            return time.getTime() > Date.now() || time.getTime() < disDatestart
            // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
            // return time.getTime() <= Date.now()
            // return time.getTime() < Date.now() - 8.64e7
            },
            getdataformdata(){
                let that = this;
                //获取系统最开始投入使用的时间
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
                    this.startUsetime = res.data.data.StartUseTime
                    console.log("打印一下子_______________",(new Date(this.startUsetime)).getTime())
                    let diff = Math.abs(firstDate.getTime() - secondDate.getTime()) 
                    let Usetime=parseInt(diff / (1000 * 60 * 60 * 24))  
                    let ress=res.data.data;
                    // Usetime=300;
                    let disablearr
                    disablearr=[false,false,false];
                    //当系统使用时间少于一个月时
                    if(Usetime<=30){ 
                        console.log("执行了吗，执行了2");
                        for(var k=0;k<3;k++){
                            if(k==2){
                                disablearr[k]=false;
                            }
                            else disablearr[k]=true;
                        }
                        that.index = 2;
                        for(var i=0;i<3;i++){
                            if(i==2){
                                that.btn.push(1)
                            }
                            else {
                                that.btn.push(0);
                            }
                        }
                        for(var i=0;i<3;i++){
                            if(i==0){
                                that.but.push(1)
                            }
                            else {
                                that.but.push(0)
                        }   
                        }
                        //初始化开始和结束数据
                        that.time = that.timetype[2]
                        console.log("查看时间单位",that.time)
                        that.timestart=that.getDay(-10)
                        that.timeend=that.getDay(-1)
                    }
                    else {
                        //当系统使用时间大于一个月少于一年时
                        if(Usetime<=365){
                            for(var k=0;k<3;k++){
                                if(k==0){
                                    disablearr[k]=true;
                                }
                                else disablearr[k]=false;
                            };
                            that.index = 1;
                            for(var i=0;i<3;i++){
                                if(i==1){
                                    that.btn.push(1)
                                }
                                else {
                                    that.btn.push(0);
                                }
                            };
                            console.log("打印按钮数组",that.btn)
                            for(var i=0;i<3;i++){
                                if(i==0){
                                    that.but.push(1)
                                }
                                else {
                                    that.but.push(0)
                                }   
                            }
                            that.time = that.timetype[1]
                            //初始化开始和结束数据
                            console.log("查看时间单位",that.time)
                            console.log("打印时间",that.getPreMonth(5))
                            that.timestart=that.getPreMonth(5)+"-01"
                            that.timeend=that.getPreMonth(1)+"-01"
                        }
                        //当系统使用时间大于一年时
                        else {
                            for(var k=0;k<3;k++){
                                disablearr[k]=false;
                            }
                            that.index = 0;
                            for(var i=0;i<3;i++){
                                if(i==0){
                                    that.btn.push(1)
                                }
                                else {
                                    that.btn.push(0);
                                }
                            }
                            for(var i=0;i<3;i++){
                                if(i==0){
                                    that.but.push(1)
                                }
                                else {
                                    that.but.push(0)
                                }   
                            }
                            that.time =that.timetype[0]
                            //初始化开始和结束数据
                            console.log("查看时间单位",that.time)
                            that.timestart=that.getYear(-5)+"-01-01"
                            that.timeend=that.getYear(-1)+"-01-01"
                        }
                    }
                    that.disable=disablearr;
                    that.disableTip=disablearr.map(item => !item);
                    console.log("数组",that.disable,disablearr,that.disableTip)
                }).catch((error) => {
                    console.log(error);
                });
            },
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
                return oYear+num+'';
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
            getPreMonth:function(monthNum){
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
                var t2 = year2 + '-' + month2;
                return t2;
            },
            
            getYearvalue:function (i) {
                //建立空数组，处理vue响应式问题
                var myarr=[];
                var myarr2=[];
                for(var j=0;j<3;j++){
                    if((i-1)==j)
                        myarr[j] = 1;
                    else myarr[j] = 0;
                    myarr2[j] = 0;
                }
                //赋给原数组
                this.btn=myarr;
                this.but=myarr2;
                this.index=i-1;
                this.time=this.timetype[i-1];
                console.log("查看时间单位",this.time)
            },
            getScalevalue:function (i) {
                //建立空数组，处理vue响应式问题
                var myarr=[];
                for(var j=0;j<3;j++){
                    if((i-1)==j)
                        myarr[j] = 1;
                    else myarr[j] = 0;
                }
                //赋给原数组
                var that = this;
                this.but=myarr;
                switch (this.index) {
                    case 0:
                        switch (i) {
                            case 1:
                                this.timestart = this.getYear(-5)+"-01-01";
                                this.timeend = this.getYear(-1)+"-01-01";
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByYear',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionYear',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                            case 2:
                                this.timestart = this.getYear(-10)+"-01-01";
                                this.timeend = this.getYear(-1)+"-01-01";
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByYear',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionYear',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                            case 3:
                                this.timestart = this.getYear(-15)+"-01-01";
                                this.timeend = this.getYear(-1)+"-01-01";
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByYear',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionYear',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                        }
                        break;
                    case 1:
                        switch (i) {
                            case 1:
                                this.timestart = this.getPreMonthDay(5);
                                this.timeend = this.getPreMonthDay(1);
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByMonth',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionMonth',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                            case 2:
                                this.timestart = this.getPreMonthDay(10);
                                this.timeend = this.getPreMonthDay(1);
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByMonth',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionMonth',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                            case 3:
                                this.timestart = this.getPreMonthDay(15);
                                this.timeend = this.getPreMonthDay(1);
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByMonth',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionMonth',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                        }
                        break;
                    case 2:
                        switch (i) {
                            case 1:
                                this.timestart=this.getDay(-10);
                                this.timeend=this.getDay(-1);
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByDay',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionDay',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                            case 2:
                                this.timestart=this.getDay(-20);
                                this.timeend=this.getDay(-1);
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByDay',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionDay',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                            case 3:
                                this.timestart=this.getDay(-30);
                                this.timeend=this.getDay(-1);
                                axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/order/getcountByDay',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(res=>{
                                    let transitArr=[];
                                    for(var i=0;i<res.data.data.length;i++){
                                        transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                                    }
                                    that.updategraghArr(transitArr);
                                    that.updatedata();
                                    that.updatedataoption();
                                    that.myChart1vuex.setOption(that.Optionvuex);
                                    //获取图二的数据
                                    axios({
                                    method:'post',
                                    url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionDay',
                                    data:'&date1='+this.timestart+'&date2='+this.timeend,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                    }).then(res=>{
                                        let transitArr2=[];
                                        for(var i=0;i<res.data.data.length;i++){
                                            transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                        };
                                        that.updategraghArr2(transitArr2);
                                        that.updatedata2();
                                        that.updatedataoption2();
                                        that.myChart2vuex.setOption(that.Option2vuex);
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                });
                                break;
                        }
                        break;
                }
            },
            comfirmCommit:function(){
                var that=this;
                switch (this.index) {
                    case 0:
                        console.log(this.timestart,this.timeend);
                        axios({
                            method:'post',
                            url:'http://'+GlobalMsg.ip+':8080/order/getcountByYear',
                            data:'&date1='+this.timestart+'&date2='+this.timeend,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(res=>{
                            let transitArr=[];
                            for(var i=0;i<res.data.data.length;i++){
                                transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                            }
                            that.updategraghArr(transitArr);
                            that.updatedata();
                            that.updatedataoption();
                            that.myChart1vuex.setOption(that.Optionvuex);
                            //获取图二的数据
                            axios({
                            method:'post',
                            url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionYear',
                            data:'&date1='+this.timestart+'&date2='+this.timeend,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                            }).then(res=>{
                                console.log("这是res值",res)
                                let transitArr2=[];
                                for(var i=0;i<res.data.data.length;i++){
                                    transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                };
                                that.updategraghArr2(transitArr2);
                                that.updatedata2();
                                that.updatedataoption2();
                                that.myChart2vuex.setOption(that.Option2vuex);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }).catch((error) => {
                            console.log(error);
                        });
                        break;
                    case 1:
                        axios({
                            method:'post',
                            url:'http://'+GlobalMsg.ip+':8080/order/getcountByMonth',
                            data:'&date1='+this.timestart+'&date2='+this.timeend,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(res=>{
                            let transitArr=[];
                            for(var i=0;i<res.data.data.length;i++){
                                transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                            }
                            that.updategraghArr(transitArr);
                            that.updatedata();
                            that.updatedataoption();
                            that.myChart1vuex.setOption(that.Optionvuex);
                            //获取图二的数据
                            axios({
                            method:'post',
                            url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionMonth',
                            data:'&date1='+this.timestart+'&date2='+this.timeend,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                            }).then(res=>{
                                console.log("这是res值",res)
                                let transitArr2=[];
                                for(var i=0;i<res.data.data.length;i++){
                                    transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                };
                                that.updategraghArr2(transitArr2);
                                that.updatedata2();
                                that.updatedataoption2();
                                that.myChart2vuex.setOption(that.Option2vuex);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }).catch((error) => {
                            console.log(error);
                        });
                        break;
                    case 2:
                        console.log(this.timestart,this.timeend);
                        axios({
                            method:'post',
                            url:'http://'+GlobalMsg.ip+':8080/order/getcountByDay',
                            data:'&date1='+this.timestart+'&date2='+this.timeend,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(res=>{
                            console.log("这是res值",res)
                            let transitArr=[];
                            for(var i=0;i<res.data.data.length;i++){
                                transitArr.push([res.data.data[i].date,res.data.data[i].countPatient])
                            }
                            that.updategraghArr(transitArr);
                            that.updatedata();
                            that.updatedataoption();
                            that.myChart1vuex.setOption(that.Optionvuex);
                            //获取图二的数据
                            axios({
                            method:'post',
                            url:'http://'+GlobalMsg.ip+':8080/time/getRecognitionDay',
                            data:'&date1='+this.timestart+'&date2='+this.timeend,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                            }).then(res=>{
                                let transitArr2=[];
                                for(var i=0;i<res.data.data.length;i++){
                                    transitArr2.push([res.data.data[i].date,res.data.data[i].recognition])
                                };
                                that.updategraghArr2(transitArr2);
                                that.updatedata2();
                                that.updatedataoption2();
                                that.myChart2vuex.setOption(that.Option2vuex);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }).catch((error) => {
                            console.log(error);
                        });
                        break;
                }
            },
            passIscollape:function () {
                this.isCollapse=!this.isCollapse;
                this.$emit('showIscape',this.isCollapse)
            }
        },
    }

</script>

<style>
    .el-tooltip__popper.is-light {
        background: #F7F8FB;
        border: 1px solid rgb(172, 170, 170);
    }
    .el-tooltip__popper {
    line-height: 0.5;
    }
    .el-tooltip__popper .popper__arrow, .el-tooltip__popper .popper__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: 
    transparent;
    border-style: solid;
    }
    .mytop{
      text-align: center;
    }
    .text {
        font-size: 12px;
    }
    .item {
        margin-bottom: 1px;
    }

    .center {
        text-align: center;
    }
    .example {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 32px;
    }

    .example:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
    }

    .example input {
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        margin-left: 16px;
        padding: 8px;
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
    .is-selected {
        color: #1989FA;
    }
    .el-calendar-table .el-calendar-day{
        height: 30px !important;
        width: 30px !important;
        padding: 4px !important;
        font-size:12px ;
        text-align: center;
    }
    .el-input__inner{
        height: 30px;
    }
    .el-calendar__body{
        padding-top:5px;
    }
    .el-calendar-table thead th{
        font-size: 12px;
    }
    .el-calendar-table td{
        vertical-align: middle;
        text-align: center;
    }
    .el-calendar-table_row .current{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-calendar-day{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .current{
        text-align: center;
    }

    #btn{
        background: transparent;
        border: 0px solid transparent;
    }

    .btnx{
        height: 25px;
        width: 50px;
        background:#F7F8FB;
        border: 0px solid transparent;
        border-radius: 3px;
    }
    .btny{
        height: 30px;
        width: 70px;
        background:#F7F8FB;
        border: 0px solid transparent;
        border-radius: 3px;
    }

    .activex {
        background: #2a89ea !important;
        border: 0px solid transparent !important;
        color: white !important;
    }
    .el-calendar-table .el-calendar-day{
        height: 30px !important;
    }
    .el-calendar__body{
        padding-bottom: 10px;
    }

</style>
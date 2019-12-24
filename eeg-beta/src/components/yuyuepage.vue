<template>
    <div>
        <!-- 上边栏 -->
        <el-row style="padding-top: 30px;padding-left: 4%;margin-bottom: 20px">
            <div style="display:flex;">
                <div>
                    <span style="font-size: 20px;font-weight: bold;">预约病人</span>
                </div>
            </div>
            <div style="margin-top:10px;background-color: lightgrey;height: 2px;">
            </div>
        </el-row>
        <el-row style="padding-left: 3%;margin-top: 50px;">
            <el-col :span="10"><div>
                <div style="display:flex;margin-bottom: 20px;margin-left: 40px">
                    <div>
                        <span style="font-size: 15px;font-weight: bold;">病人信息</span>
                    </div>
                </div>
                <el-form ref="myFormref" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <div style="display: flex">
                        <el-form-item label="姓名：" prop="name" style="margin-right: 20px;">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码：" prop="phone">
                            <el-input v-model.number="ruleForm.phone"></el-input>
                        </el-form-item>
                    </div>
                    <div style="display: flex;margin-top: 20px">
                        <el-form-item label="年龄：" prop="old" style="margin-right: 20px;">
                            <el-input v-model.number="ruleForm.old"></el-input>
                        </el-form-item>
                        <el-form-item label="出生日期：" prop="date">
                            <el-date-picker
                                v-model="ruleForm.date"
                                type="date"
                                placeholder=""
                                style="width:214px">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div style="display: flex;margin-top: 20px">
                        <el-form-item label="性别：" prop="gender" style="float: left">
                            <el-radio v-model="ruleForm.gender" label="男"></el-radio>
                            <el-radio v-model="ruleForm.gender" label="女"></el-radio>
                        </el-form-item>
                    </div>
                    <div style="margin-top: 20px">
                        <el-form-item label="病史：">
                            <el-input
                                type="textarea"
                                placeholder="请输入病史"
                                :rows="12"
                                v-model="ruleForm.medicalHistory"
                                style="width:550px;">
                            </el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div></el-col>

            <el-col :span="12"><div style="margin-left: 80px">
                <div style="display:flex;justify-content: space-between">
                    <div>
                        <span style="font-size: 15px;font-weight: bold;">预约时间</span>
                    </div>
                    <div>
                        <el-row>
                            <el-button type="primary" icon="el-icon-arrow-left" size="mini" circle @click="leftchangePage"></el-button>
                            <el-button type="primary" icon="el-icon-arrow-right" size="mini" circle @click="rightchangePage"></el-button>
                        </el-row>
                    </div>

                </div>
                <!--实现翻页-->
                <div v-if="justifyFirstpage">
                    <el-row :gutter="5">
                        <el-col :span="6" v-for="i in 8" :key="i"><div>
                            <el-button :class="{yactive:ybut[i-1]}" @click="getfirstPagevalue(i)" style="background:#F7F8FB;height: 75px;width: 150px;border: 0px solid #F7F8FB"><span style="font-weight: 800">{{yuyueData[i-1]}}<br><br>{{yuyueWeek[i-1]}}({{yuyuenum[i-1]}})</span></el-button>
                        </div></el-col>
                    </el-row>
                </div>
                <div v-else>
                    <el-row :gutter="5">
                        <el-col :span="6" v-for="i in 7" :key="i"><div>
                            <el-button :class="{yactive:ybut[i-1]}" @click="getfirstPagevalue(i+8)" style="background:#F7F8FB;height: 75px;width: 150px;border: 0px solid #F7F8FB"><span style="font-weight: 800">{{yuyueData[i+7]}}<br><br>{{yuyueWeek[i+7]}}({{yuyuenum[i+7]}})</span></el-button>
                        </div></el-col>
                    </el-row>
                </div>
                <el-row :gutter="5" style="margin-top: 60px">
                    <el-col :span="11" style="margin-left: 25px"><div>
                        <div style="padding: 10px;border:1px solid lightgrey;height: 250px;width: 300px">
                            <div style="display:flex;justify-content: space-between;margin-top: 10px">
                                <div>
                                    <span style="font-size: 15px;font-weight: bold;">上午({{monpaitentNum.length}})</span>
                                </div>
                                <div>
                                    <el-row>
                                        <el-button type="primary" round size="mini" icon="el-icon-plus" @click="monAddpatient">加入病人</el-button>
                                        <!--                            <el-button type="primary " size="mini" circle><i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
                                    </el-row>
                                </div>
                            </div>
                            <el-row :gutter="3">
                                <el-col :span="6" class="locate" v-for="(monpaitent,i) in monpaitentNum" :key='i' >
                                    <div v-if="monpaitent.isActivebg!=111111">
                                        <div class="paitent" @contextmenu.prevent="mondelUser($event,i)"><div class="locate">{{monpaitent.name}}</div></div>
                                    </div>
                                    <div v-else>
                                        <div class="paitent" style="color:#66B1FF " @contextmenu.prevent="mondelUser($event,i)"><div class="locate">{{monpaitent.name}}</div></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div></el-col>
                    <el-col :span="11" style="margin-left: 20px;"><div>
                        <div style="padding: 10px;border:1px solid lightgrey;height: 250px;width: 300px">
                            <div style="display:flex;justify-content: space-between;margin-top: 10px">
                                <div>
                                    <span style="font-size: 15px;font-weight: bold;">下午({{afterpaitentNum.length}})</span>
                                </div>
                                <div>
                                    <el-row>
                                        <el-button type="primary" round size="mini" icon="el-icon-plus" @click="afterAddpatient">加入病人</el-button>
                                    </el-row>
                                </div>
                            </div>
                            <el-row :gutter="3">
                                <el-col :span="6" class="locate" v-for="(afterpaitent,i) in afterpaitentNum" :key='i' >
                                    <div v-if="afterpaitent.isActivebg!=111111">
                                        <div class="paitent" @contextmenu.prevent="afterdelUser($event,i)"><div class="locate">{{afterpaitent.name}}</div></div>
                                    </div>
                                    <div v-else>
                                        <div class="paitent" style="color:#66B1FF" @contextmenu.prevent="afterdelUser($event,i)"><div class="locate">{{afterpaitent.name}}</div></div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div></el-col>
                </el-row>
                <el-row style="margin-top: 40px;display: flex;justify-content: center">
                    <div>
                        <el-button type="primary" style="height: 40px;width:190px;" @click="confirmYuyue()"><span style="font-weight: 400;font-size: 16px">确定预约</span></el-button>
                    </div>
                </el-row>
            </div></el-col>
            <el-col :span="2"><div style="padding: 30px;">
            </div></el-col>
        </el-row>
    </div>
</template>


<script>
    import axios from 'axios'
    import GlobalMsg from '../global_msg.js'
    export default {
        data()
        {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                ruleForm: {
                    name: '',
                    phone: '',
                    old: '',
                    gender: '1',
                    date:"",
                    medicalHistory: '',
                },
                rules: {
                    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' },
                        { validator: checkPhone, trigger: 'blur' },
                    ],
                    old:[
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                        { type: 'number', message: '年龄必须为数字值'}
                    ],
                    gender:[{required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                    date:[{required: true, message: '请选择出生日期', trigger: 'blur'},
                    ],
                },
                shangwu:'',
                xiawu:'',
                yuyueData:[],
                yuyueWeek:[],
                ybut:[],
                yuyuenum:[],
                requestFlag:0,
                i:0,
                yuYue:[],
                monpaitentNum:[],
                monpaitentId:[],
                afterpaitentNum:[],
                afterpaitentId:[],
                monarr:[[{
                    name:'',
                    patientId:''
                },{
                    name:'',
                    patientId:''
                }],[{
                    name:'',
                    patientId:''
                }]],
                afterarr:[],
                justifyFirstpage:true,
                monNum:10,
                afterNum:10,
                ispaitent:true,
                paitent:"",
                test:[],
                time:"",
                ampm:0,
                patientId:'',
                isyuyue:false,
                isActiveBack:false,
                indexbnt:0,
                selfstyle: {
                    fontWeight:"400",
                    height:"80px",
                    width:"150px",
                    color: "black",
                    background:"#F7F8FB",
                    border:"1px solid #F7F8FB"
                },
                selfstyle1: {
                    fontWeight:"400",
                    height:"80px",
                    width:"150px",
                    color: "#2A89EA",
                    background:"#EEF6FF",
                    border:"1.8px sonom lid #2A89EA"
                },
            }
        },
        created(){
            this.init();
        },
        mounted(){
            this.getnuminit();
            setTimeout(() =>{
                console.log(this.afterarr)
                console.log("---------------------",this.yuyuenum);
            },2000)

        },
        methods:{
            init(){
                this.ybut.push(1);
                for(var i=0;i<15;i++)
                {
                    this.yuyueData.push(this.getDay(i+1, '-'));
                    this.yuyueWeek.push(this.get7Days(i+1));
                    if(i!=14)
                    {
                        this.ybut.push(0);
                    }
                }
                this.time = this.yuyueData[0];
                console.log("this.ybut",this.ybut)
            },
            getDay(num, str)
            {
                var today = new Date();
                var nowTime = today.getTime();
                var ms = 24*3600*1000*num;
                today.setTime(parseInt(nowTime + ms));
                var oYear = today.getFullYear();
                var oMoth = (today.getMonth() + 1).toString();
                if (oMoth.length <= 1) oMoth = '0' + oMoth;
                var oDay = today.getDate().toString();
                if (oDay.length <= 1) oDay = '0' + oDay;
                return oYear + str + oMoth + str + oDay;
            },
            get7Days(i){
                var now = new Date();
                var nowTime = now.getTime() ;
                var oneDayTime = 24*60*60*1000 ;
                var ShowTime = nowTime + i*oneDayTime ;
                var myDate = new Date(ShowTime);
                var bb = "星期" + "日一二三四五六".charAt(myDate.getDay());
                return bb;
            },
            leftchangePage:function(){
                if (!this.justifyFirstpage)
                {
                    this.justifyFirstpage=!this.justifyFirstpage;
                }
                else console.log("无反应")
            },
            rightchangePage:function(){
                if (this.justifyFirstpage)
                {
                    this.justifyFirstpage=!this.justifyFirstpage;
                    console.log("翻向第二个页面")
                }
                else console.log("无反应")
            },
            mondelUser:function(e,i){
                var this2=this;
                this.$confirm('此操作将删除该预约病人, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    axios({
                        method:'post',
                        url:'http://'+GlobalMsg.ip+':8080/order/deleteorder',
                        data:'patientId='+this2.monpaitentNum[i].patientId,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res=>{
                        console.log("删除的数据",res.data);
                        this2.monpaitentNum.splice(i,1);
                        this2.isyuyue=false;
                        this2.i=0;
                        this2.yuyuenum.length=0;
                        this2.getnum()
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            afterdelUser:function(e,i){
                //console.log('haha:',i);
                var this3=this;
                this.$confirm('此操作将删除该预约病人, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log("第一步",this3.afterpaitentNum[i].patientId);
                    axios({
                        method:'post',
                        url:'http://'+GlobalMsg.ip+':8080/order/deleteorder',
                        data:'patientId='+this3.afterpaitentNum[i].patientId,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res=>{
                        console.log("删除的数据",res.data);
                        this3.isyuyue=false;
                        this3.afterpaitentNum.splice(i,1);
                        this3.isyuyue=false;
                        this3.i=0;
                        this3.yuyuenum.length=0;
                        this3.getnum()
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this3.getnum()

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            monAddpatient:function(){
                this.$refs.myFormref.validate(valid =>{
                    if(!valid) return;
                    else {
                        if(this.monpaitentNum.length+this.afterpaitentNum.length==10)
                        {
                            return this.$message('该天预约已满，请选择其他预约日期');
                        }
                        else{
                            if(!this.isyuyue)
                            {
                                this.monpaitentNum.push({"ampm": 0,
                                    "name": this.ruleForm.name,
                                    "time": this.time,
                                    "isActivebg":111111,
                                    "status": 0});
                                this.ampm=0;
                                this.isyuyue=true;
                            }
                            else{
                                this.$message('您已经预约');
                            }
                        }
                    }
                })
            },
            afterAddpatient:function(){
                this.$refs.myFormref.validate(valid =>{
                    if(!valid) return;
                    else {
                        if(this.monpaitentNum.length+this.afterpaitentNum.length==10)
                        {
                            return this.$message('该天预约已满，请选择其他预约日期');
                        }
                        else{
                            if(!this.isyuyue)
                            {
                                this.afterpaitentNum.push({"ampm": 1,
                                    "name": this.ruleForm.name,
                                    "time": this.time,
                                    "isActivebg":111111,
                                    "status": 0});
                                this.ampm=1;
                                this.isyuyue=true;
                            }
                            else{
                                this.$message('您已经预约');
                            }
                        }
                    }
                })

            },
            confirmYuyue(){
                let that=this;
                this.$confirm('是否为病人'+this.ruleForm.name+'在'+this.time+'预约吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    that.addPaitent();
                    this.$message({
                        type: 'success',
                        message: '预约成功!'
                    });
                }).catch(() => {
                    //取消删除时取消上下午框中数据
                    if(that.ampm==0)
                        that.monpaitentNum.splice(that.monpaitentNum.length-1,1);
                    else that.afterpaitentNum.splice(that.afterpaitentNum.length-1,1);
                    console.log("打印一下");
                    this.$message({
                        type: 'info',
                        message: '已取消预约'
                    });
                });

            },
            addPaitent(){
                var that = this;
                // console.log("看看性别+++++++++++++++++++++++++++++",this.ruleForm.gender)
                axios.post("http://"+GlobalMsg.ip+":8080/order/orderpatient",{"name": this.ruleForm.name,
                    "gender": (this.ruleForm.gender)=="男"?'男':'女',
                    "old": this.ruleForm.old,
                    "medicalHistory": this.ruleForm.medicalHistory,
                    "phone": this.ruleForm.phone,
                    "date":this.ruleForm.date,
                }).then(res=>{
                    // console.log("第一个",res.data);
                    that.patientId=res.data.data.patientId;
                    //预约数组设为空，即将拉取后台新数据
                    that.i=0;
                    that.yuyuenum.length=0;
                    this.addPaitentyuyue();
                });
            },
            addPaitentyuyue(){
                var that=this;
                console.log("查看加入病人参数")
                axios.post("http://"+GlobalMsg.ip+":8080/order/insertorder",{
                    "doctorId": "DH20191112001",
                    "time":this.time,
                    "ampm": this.ampm,
                    "patientId": this.patientId,
                    "status": 1}).then(res=>{

                    if(res.data.data.ampm==0)
                        this.monpaitentId.push(res.data.data.patientId)
                    else this.afterpaitentId.push(res.data.data.patientId)
                    that.isyuyue=false;
                    //拉取新数据
                    that.getnum();
                    //重置表单
                    that.$refs.myFormref.resetFields();
                    that.ruleForm.medicalHistory=''
                });
            },
            getnum(){
                var that=this;
                console.log("______________________________________that.yuyueData",that.yuyueData);
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/order/selectname',
                    data:'&time='+that.yuyueData+'&ampm='+0,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("返回的数据",res)
                    let resData = res.data.data;
                    for(let i=0;i<15;i++){
                        that.monarr[i]=resData[i];
                    }
                    console.log("第二种关键之处上午查看++++++++++++++",resData);
                    axios({
                        method:'post',
                        url:'http://'+GlobalMsg.ip+':8080/order/selectname',
                        data:'&time='+that.yuyueData+'&ampm='+1,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res=>{
                        let resData = res.data.data;
                        for(let i=0;i<15;i++){
                            that.afterarr[i]=resData[i];
                        }
                        for(let j=0;j<15;j++){
                            that.yuyuenum.push(that.monarr[j].length+that.afterarr[j].length)
                            console.log("查看that.monarr[j].length",res,resData,that.monarr[j])
                        }
                        console.log("---查看一下预约人数---",that.yuyuenum)
                    });
                }).catch((error) => {
                    console.log(error);
                });
            },
            getnuminit(){
                var that=this;
                console.log("______________________________________that.yuyueData",that.yuyueData);
                axios({
                    method:'post',
                    url:'http://'+GlobalMsg.ip+':8080/order/selectname',
                    data:'&time='+that.yuyueData+'&ampm='+0,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(res=>{
                    console.log("返回的数据",res)
                    let resData = res.data.data;
                    for(let i=0;i<15;i++){
                        that.monarr[i]=resData[i];
                    }
                    console.log("第一种关键之处上午查看++++++++++++++",resData);
                    axios({
                        method:'post',
                        url:'http://'+GlobalMsg.ip+':8080/order/selectname',
                        data:'&time='+that.yuyueData+'&ampm='+1,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(res=>{
                        let resData = res.data.data;
                        for(let i=0;i<15;i++){
                            that.afterarr[i]=resData[i];
                        }
                        for(let j=0;j<15;j++){
                            that.yuyuenum.push(that.monarr[j].length+that.afterarr[j].length)
                            console.log("查看that.monarr[j].length",res,resData,that.monarr[j])
                        }
                        that.monpaitentNum=that.monarr[0];
                        that.afterpaitentNum=that.afterarr[0];
                        console.log("~~~查看一下预约人数~~~",that.yuyuenum)
                    });
                }).catch((error) => {
                    console.log(error);
                });
            },
            getfirstPagevalue:function(i){
                //当点击其他年份，取消"你已预约限制"
                if(this.indexbnt != i){
                    this.isyuyue = false
                }
                console.log(i);
                for(var j=0;j<15;j++){
                    if(i==j) {
                        this.ybut[j-1]=1
                    }
                    else{
                        this.ybut[j-1]=0
                    }
                }
                let myarrmon = []
                let myarrafter = []
                myarrmon = this.monarr[i-1]
                myarrafter = this.afterarr[i-1]
                // console.log("k愁一愁是什么",this.monarr[i-1],myarr)
                this.time=this.yuyueData[i-1];
                this.monpaitentNum=[];
                this.afterpaitentNum=[];
                for(let j=0;j<myarrmon.length;j++){
                    this.monpaitentNum.push(myarrmon[j]);
                }
                for(let k=0;k<myarrafter.length;k++){
                    this.afterpaitentNum.push(myarrafter[k]);
                }
                //把本次i保存进indexbnt中
                this.indexbnt = i;
                // this.monpaitentNum=myarrmon;
                // this.afterpaitentNum=myarrafter;
                
                console.log("数组查看","this.monpaitentNum",this.monpaitentNum,"this.afterpaitentNum",this.afterpaitentNum)
                console.log("渲染",this.ybut);
            },
        },
    }
</script>

<style scoped>
    *{
        font-size: 14px;
        font-family:Microsoft YaHei;
    }

    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        margin-bottom: 20px;
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: transparent;
    }
    .grid-content {
        display: flex;justify-content: center;align-items:center;
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .but:active {
        background-color: #000000;
    }
    .but:hover{
        background-color:deepskyblue;
    }

    .btn{
        background-color: lightgrey;
        border-style: solid;
        border-color: lightgrey;
    }

    .elebtn{
        color:black;
        margin-left:30px;
        height: 50px;
        width:120px;
        background-color: lightgrey;
        border-style: solid;
        border-color: lightgrey;
    }
    .btn:hover{
        background-color:deepskyblue;
    }

    textarea{
        border-style: solid;
        border-color: lightgrey;
    }
    .yactive{
        background: #EEF6FF !important;
        color:#66B1FF !important;
        border: 1px solid #66B1FF !important;
    }

    .empty{
        height: 37px !important;
        width: 70px !important
    }
    .paitent{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F7F8FB;
        font-weight: 550;
        height: 35px;
        width: 68px;
        border: 1px solid #F7F8FB;
        border-radius: 3px;
    }
    .locate{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>



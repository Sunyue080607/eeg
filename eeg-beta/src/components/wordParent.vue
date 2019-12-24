<template>
    <div>
        <div style="background-color: white;padding: 0;height: 60px">
            <el-row style="padding-left:0px ">
                <el-col :span="15">
                    <div>
                        <div style="width: 400px;height: 60px" class="flex-container">
                            <el-button @click="btnClickreturn" type="primary"  style="width: 130px;height: 60px;font-size: 20px;padding:0px;background-color: #f7f8fb;border-width: 0px" >
                                <img alt="aside" src="../assets/return.png">
                            </el-button>
                            <div style="margin-left: 20px;" class="flex-container">
                                <p style="font-size: 15px;color: gray;margin-top: 21.5px">当前病人：</p>
                                <span style="font-size: 16px;margin-top: 21.5px;font-weight: 600">{{name}}</span>
                                <span style="font-size: 16px;margin-top: 21.5px;font-weight: 600;margin-left: 10px">{{age}}岁</span>
                            </div>
                        </div>
                    </div>
                </el-col>
<!--                v-print="'#printMe'-->
                <div style="float: right;margin-top: 12.5px;margin-right: 10px">
                    <div style="width: 240px;height: 35px" class="flex-container">
                        <button class="button1"  @click="btnClickprint">打印</button>
                        <button class="button1" @click="exportWord" >导出报告</button>
                        <button class="button2" @click="btnClicksave">保存入库</button>
                    </div>
                </div>
            </el-row>
        </div>
        <div ref="editor" style="height: 100%;" ></div>

    </div>
</template>

<script>
    //有效
    //npm install --save wangeditor
    // npm install docxtemplater pizzip
    //修改/public/index.html 文件：添加一下js连接（自己加一下关闭标签）
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.9.1/docxtemplater.js">
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/2.6.1/jszip.js">
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js">
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.js">


    //在/public中加入模板文件：template.docx

    import E from 'wangeditor'
    import GlobalMsg from '../global_msg.js'
    import axios from 'axios'

    export default {
        name: 'editor',
        components:{
        },
        data () {
            return {
                editorContent: '',
                age:'',
                name:"",
                content:{
                    name:'',//病人姓名
                    eegId:'',//脑电图号
                    gender:'',//性别
                    old:'',//年龄
                    month:'',
                    time:'',//检测时间
                    category:'',//科室
                    sleepMode:'',//睡眠方式
                    bedNum:'',//病区床号
                    diagnosis:'',//临床诊断
                    activity:'',//背景活动
                    stage:'',//睡眠期
                    abWave:'',//异常波
                    seizures:'',//临床发作
                    veeg:'',//veeg印象
                    person:'',//审核人
                    reporter:'',//报告人
                    reportdate:'',//报告日期
                    eggnum:'',
                    overventilation:'',
                    reportId:''
                }
            }
        },
        methods: {
            btnClickreturn: function () {
                // this.$router.push({path:'/loginpage'})
                this.$router.push({path:'/videoPage/'})
            },
            btnClickprint: function () {

                //根据div标签ID拿到div中的局部内容
                var bdhtml=window.document.body.innerHTML;
                console.log(bdhtml)
                var jubuData = document.getElementById("printMe").innerHTML;
                console.log(jubuData)
                //把获取的 局部div内容赋给body标签, 相当于重置了 body里的内容
                window.document.body.innerHTML= jubuData;
                //调用打印功能
                window.print();
                window.document.body.innerHTML=bdhtml;//重新给页面内容赋值；

            },
            btnClicksave: function () {
                let me =this
                this.updateContent()
                //requestbody
                let data = {
                    reportId:me.content.reportId,
                    doctorId: this.$route.query.doctorId,
                    patientId: this.$route.query.id,
                    eegId:me.content.eegId,
                    category:me.content.category,
                    sleepMode:me.content.sleepMode,
                    bedNum:me.content.bedNum,
                    diagnosis:me.content.diagnosis,
                    activity: me.content.activity,
                    overventilation:me.content.overventilation,
                    stage:me.content.stage,
                    abWave:me.content.abWave,
                    seizures:me.content.seizures,
                    veeg:me.content.veeg,
                    person:me.content.person,
                    reporter:me.content.reporter,
                }
                this.$axios.post('http://'+GlobalMsg.ip+':8080/report/updateReport',JSON.stringify(data))
                    .then((response) => {
                        console.log(data)
                        console.log('ok')
                    }).catch((error) => {
                        console.log(data)
                        console.log(error);
                });


            },
            updateContent(){
                this.content.name = document.getElementById("patientName").innerText
                this.content.eegId = document.getElementById("eegId").innerText
                this.content.gender = document.getElementById("gender").innerText
                this.content.old = document.getElementById("old").innerText
                this.content.time = document.getElementById("time").innerText
                this.content.category = document.getElementById("category").innerText
                this.content.sleepMode = document.getElementById("sleepMode").innerText
                this.content.bedNum = document.getElementById("bedNum").innerText
                this.content.diagnosis = document.getElementById("diagnosis").innerText
                this.content.activity = document.getElementById("activity").innerText
                this.content.overventilation = document.getElementById("overventilation").innerText
                this.content.stage = document.getElementById("stage").innerText
                this.content.abWave = document.getElementById("abWave").innerText
                this.content.seizures = document.getElementById("seizures").innerText
                this.content.veeg = document.getElementById("veeg").innerText
                this.content.person = document.getElementById("person").innerText
                this.content.reporter = document.getElementById("reporter").innerText
                this.content.reportdate = document.getElementById("reportdate").innerText
            },
            exportWord: function() {
                this.updateContent()
                let _this = this;
                // 读取并获得模板文件的二进制内容
                JSZipUtils.getBinaryContent("template.docx", function(error, content) {
                    // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
                    // 抛出异常
                    if (error) {
                        throw error;
                    }

                    // 创建一个JSZip实例，内容为模板的内容
                    let zip = new JSZip(content);
                    // 创建并加载docxtemplater实例对象
                    let doc = new window.docxtemplater().loadZip(zip);
                    // 设置模板变量的值
                    doc.setData({
                        ..._this.content,
                    });

                    try {
                        // 用模板变量的值替换所有模板变量
                        doc.render();
                    } catch (error) {
                        // 抛出异常
                        let e = {
                            message: error.message,
                            name: error.name,
                            stack: error.stack,
                            properties: error.properties
                        };
                        console.log(JSON.stringify({ error: e }));
                        throw error;
                    }

                    // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                    let out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // 将目标文件对象保存为目标类型的文件，并命名
                    saveAs(out, "egg报告.docx");
                });
            },

            getContent: function () {
                return this.editorContent
            },
            setContent (data){
                console.log(data)
                let me=this

                let content = `<div id="printMe" style="height: 774px;background-color: white;">
                    <div >
                    <div class="tittle" >
                    安徽省立医院
                    </div>
                    <div class="tittle" >
                    安徽省立体定向神经外科研究所
                    </div>
                    <div class="tittle">
                    视频脑电图检查报告
                    </div>
                    </div>
                    <div style="margin: 0 auto;margin-top: 35px;height: 625px;width: 480px;">
                    <div style="border-bottom: 1px;border-color: black;height: 1px"></div>
                    <table  height="185" width="480"  align="center"  style="table-layout:fixed; word-wrap: break-word;border-collapse:collapse;margin-bottom: 0px;margin-top: 10px ">
                    <tr align="center">
                    <td class="littletittle"> 姓名</td>
                    <td contentEditable="true" class="littleinput" id="patientName">`+data.name+`</td>
                    <td class="littletittle">脑电图号</td>
                    <td contentEditable="true" class="littleinput" id="eegId">`+data.eegId+`</td>
                    </tr>
                    <tr align="center">
                    <td class="littletittle">性别</td>
                    <td contentEditable="true" class="littleinput" id="gender">`+data.gender+`</td>
                    <td class="littletittle">监测日期</td>
                    <td contentEditable="true" class="littleinput" id="time">`+data.time+`</td>
                    </tr>
                    <tr align="center">
                    <td class="littletittle">年龄</td>
                    <td contentEditable="true" class="littleinput" id="old">`+data.old+`</td>
                    <td class="littletittle">科别</td>
                    <td contentEditable="true" class="littleinput" id="category">`+data.category+`</td>
                    </tr>
                    <tr align="center">
                    <td class="littletittle">睡眠方式</td>
                    <td contentEditable="true" class="littleinput" id="sleepMode">`+data.sleepMode+`</td>
                    <td class="littletittle">病区床号</td>
                    <td contentEditable="true" class="littleinput" id="bedNum">`+data.bedNum+`</td>
                    </tr>

                    </table>
                    <table border="0" height="" width="" cellspacing="0" align="center" style="table-layout:fixed; word-wrap:break-word; word-wrap: break-word;border-collapse:collapse;border-top: 0px;margin-top: 0px;margin-bottom: 0px;">
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle">临床诊断</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="diagnosis">`+data.diagnosis+`</td>
                    </tr>
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle"> 背景活动</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="activity">`+data.activity+`</td>
                    </tr>
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle">睡眠期</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="stage">`+data.stage+`</td>
                    </tr>
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle">异常波</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="abWave">`+data.abWave+`</td>
                    </tr>
                    </tr>
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle">过度换气</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="overventilation">`+data.overventilation+`</td>
                    </tr>
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle">临床发作</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="seizures">`+data.seizures+`</td>
                    </tr>
                    <tr align="center">
                    <td width="119px" height="50px" class="littletittle">V-EEG印象</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput" id="veeg">`+data.veeg+`</td>
                    </tr>
                    </table>
                    <table  height="100" width="480" cellspacing="0" align="center"  style="table-layout:fixed; word-wrap:break-word; word-wrap: break-word;border-collapse:collapse;margin-top: 0px;">
                    <tr align="center">
                    <td class="littletittle"> 审核人</td>
                    <td contentEditable="true" class="littleinput" id="person">`+data.person+`</td>
                    <td class="littletittle">报告人</td>
                    <td contentEditable="true" class="littleinput" id="reporter">`+data.reporter+`</td>
                    </tr>
                    <tr align="center">
                    <td class="littletittle"></td>
                    <td contentEditable="true" class="littleinput"></td>
                    <td class="littletittle">报告日期</td>
                    <td contentEditable="true" class="littleinput" id="reportdate">`+data.reportdate+`</td>
                    </table>
                    </div>`

                this.editorContent = content
            }
        },
        mounted() {
            let me=this
            me.name=this.$store.state.patientname
            me.content.name=this.$store.state.patientname
            me.age=this.$store.state.patientage


            // requestparam
            let rconfig={
                method:'post',
                url: 'http://'+GlobalMsg.ip+':8080/report/getReport',
                data:"&patientId="+this.$route.query.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            this.$axios(rconfig)
                .then((response) => {
                    console.log(response)
                    me.content.reportId=response.data.data.reportId
                    me.content.name=response.data.data.name
                    me.content.eegId=response.data.data.eegId
                    me.content.gender=response.data.data.gender
                    me.content.old=response.data.data.old
                    me.content.category=response.data.data.category
                    me.content.diagnosis=response.data.data.diagnosis
                    me.content.veeg=response.data.data.veeg
                    me.content.seizures=response.data.data.seizures
                    me.content.abWave=response.data.data.abWave
                    me.content.activity=response.data.data.activity
                    me.content.bedNum=response.data.data.bedNum
                    me.content.sleepMode=response.data.data.sleepMode
                    me.content.stage=response.data.data.stage
                    me.content.overventilation=response.data.data.overventilation
                    me.content.time=response.data.data.time
                    me.content.person=response.data.data.person
                    me.content.reporter=response.data.data.reporter
                    me.content.reportdate=response.data.data.reportDate
                    let editor = new E(this.$refs.editor)
                    editor.create()
                    this.setContent(this.content)
                    editor.txt.append(this.getContent())
                }).catch((error) => {
                console.log(error);
            });





        }
    }
</script>


<style lang="css" >
    /*.editor {*/
    /*    width: 100%;*/
    /*    margin: 0 auto;*/
    /*    position: relative;*/
    /*    z-index: 0;*/
    /*}*/
    /*.toolbar {*/
    /*    border: 1px solid #ccc;*/
    /*}*/
    /*.text {*/
    /*    border: 1px solid #ccc;*/
    /*    min-height: 500px;*/
    /*}*/
    .w-e-text-container{
        height: 700px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
    }
    .tittle{
        text-align: center;
        font-size: 18px;
        font-weight: 600;
    }

    .flex-container {
        display: flex;
        justify-content: space-between;
    }
    .littletittle{
        /*background-color: #F7F8FB;*/
        border:1px solid lightgray;
        border-top:0
    }

    .littleinput{
        border:1px solid lightgray;
        border-top:0;
        height: 50px;
    }
    .flex-container {
        display: flex;
    }
    .button1{
        width: 80px;
        border: 0;
        background-color: #EFF1F6;
    }
    .button2{
        width: 80px;
        border: 0;
        background-color: #2A89EA;
        color: white;
    }
</style>
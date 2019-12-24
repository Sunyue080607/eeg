<template>
    <div>


    <div style="height: 60px" class="flex-container">
        <el-button @click="btnClickreturn" type="primary"  style="width: 130px;height: 60px;font-size: 20px;padding:0px;background-color: #f7f8fb;border-width: 0px" >
            <img alt="aside" src="../assets/return.png">
        </el-button>
        <div style="margin-left: 20px;" class="flex-container">
            <p style="font-size: 15px;color: gray;margin-top: 21.5px">当前病人：</p>
            <span style="font-size: 16px;margin-top: 21.5px;font-weight: 600">{{name}}</span>
            <span style="font-size: 16px;margin-top: 21.5px;font-weight: 600;margin-left: 10px">{{age}}岁</span>
        </div>
        <div class="flex-container" style="margin-left: 1050px">

            <el-button :style="selfstyle" >特征分析</el-button>
            <el-button :style="selfstyle" >导联选择</el-button>
            <el-dropdown  placement="top">
                <el-button :style="selfstyle" >调幅
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>50毫伏</el-dropdown-item>
                    <el-dropdown-item>100毫伏</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <div style="margin-top:15px;margin-left: 30px">
            <el-button class="el-icon-d-arrow-left"  style="height: 40px;" circle></el-button>
            <el-button class="el-icon-caret-right" style="height: 40px"  circle></el-button>
            <el-button class="el-icon-d-arrow-right" style="height: 40px" circle></el-button>
            </div>
<!--            <div class="btn_circle_group">-->
<!--                <button><img src="../assets/toLeft.png" style=""></button>-->
<!--                <button style="margin-top: 1px"><img src="../assets/pause.png" style="margin-right: 1px"></button>-->
<!--                <button><img src="../assets/toRight.png" style="margin-left:3px"></button>-->
<!--            </div>-->
            <div style="margin-left: 30px">
                <el-button :style="selfstyle" >打印</el-button>
            </div>
        </div>
    </div>

        <div>
            <el-container>


                <el-aside width="1200px">

                   <div style="background: black">
                      sadas
                   </div>

                </el-aside>


                <el-main>

                    <div style="width: 400px">
                        <div id="divPlugin"></div>
                        <el-row type="flex" id="btn_group">
                            <button  @click="clickStartRealPlay" style="margin-left: 40px"><img src="../assets/play.png"></button>
                            <button  @click="clickSpeedUp"><img src="../assets/next.png" style="margin-top: 4px"></button>
                            <button   @click="clickStartPlayback" circle><img src="../assets/restart.png"></button>
                            <button  @click="clickFullScreen"><img src="../assets/enlarge.png" style="margin-left:3px;margin-top:3px"></button>
                            <button  @click="clickStopPlay" circle><img src="../assets/stop.png"></button>
                        </el-row>
                    </div>






                </el-main>
            </el-container>
        </div>





    </div>
</template>

<script>

    import {WebVideoCtrl} from '../assets/js/webVideoCtrl'

    export default {
        name: "video",
        data:function () {
            return{
                age:'56',
                name:"楚江",
                selfstyle: {
                    paddingLeft:"12px",
                    marginTop: "21px",
                    paddingTop:'7px',
                    width: "80px",
                    height:'30px',
                    marginLeft: "0px",

                },
                hkvInfo: {
                    ip:"192.168.1.21",//海康威视摄像头/硬盘录像机的ip地址
                    port:"80",//海康威视摄像头/硬盘录像机的端口
                    username: "admin",//海康威视摄像头/硬盘录像机的用户名
                    password: "hfut1005",//海康威视摄像头/硬盘录像机的密码
                },
                bFull:false
            }
        },
        methods:{

            //videoInitPlugin用于检测是否安装插件，同时调用initPlugin方法
            videoInitPlugin(){
                let iRet = WebVideoCtrl.I_CheckPluginInstall();
                if (iRet === -1) {
                    alert('您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装');
                    return;
                }
                this.initPlugin()
            },

            //initPlugin先调用I_initPlugin方法，初始化插件参数，
            // 再调用I_insertOBJECTPlugin方法将插件嵌入DOM里面
            //再调用I_checkPlugininVersion方法检测插件版本
            initPlugin() {
                WebVideoCtrl.I_InitPlugin(460, 250, {
                    bWndFull:true,//是否支持单窗口双击全屏，默认支持为true
                    iWndowType: 1,
                    cbInitPluginComplete() {
                        WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
                        // 检查插件是否最新
                        if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
                            alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
                            return;
                        }
                    }
                });
            },

            //设备登陆，mounted阶段进行调用,实现自动化调用
            onLogin() {
                let that = this;
                // 登录设备
                WebVideoCtrl.I_Login(that.hkvInfo.ip,1, that.hkvInfo.port, that.hkvInfo.username, that.hkvInfo.password, {
                    async: true,
                    success: function () {
                        that.$message({
                            showClose: false,
                            message: '视频加载成功',
                            type: 'success'
                        });
                    },
                    error: function () {
                        that.$message({
                            showClose: true,
                            message: '获取视频信息失败',
                            type: 'error'
                        });
                    }
                });
            },

            //开始实施预览功能
            clickStartRealPlay(){
                let that = this;
                let szDeviceIdentify = that.hkvInfo.ip + "_" + that.hkvInfo.port;
                WebVideoCtrl.I_StartRealPlay(szDeviceIdentify)
            },

            //退出
            clickStopPlay(){
                this.stopRealPlay();
            },
            stopRealPlay(iWndIndex) {
                //let that = this;
                WebVideoCtrl.I_Stop({
                    iWndIndex: iWndIndex,
                    success:()=> {
                    },
                    error: ()=> {
                        window.console.log("当前已经退出 ")
                    }
                });
            },

            //回放功能
            clickStartPlayback(){
                let that=this
                this.stopRealPlay();
                let szDeviceIdentify = that.hkvInfo.ip + "_" + that.hkvInfo.port;
                window.console.log(szDeviceIdentify);
                WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
                    szStartTime:"2019-11-26 00:00:00",
                    szEndTime:"2019-11-26 00:00:20",
                    success(){
                        window.console.log("回放成功")
                    },
                    error(){
                        window.console.log("回放失败")
                    }
                })
            },


            //回放倍速
            clickSpeedUp() {
                WebVideoCtrl.I_PlayFast({

                        success(){
                            window.console.log("成功")
                        },
                        error(){
                            window.console.log("失败")
                        }
                    }


                )},


            //全屏播放
            clickFullScreen(){
                this.bFull=true;
                WebVideoCtrl.I_FullScreen(bFull)
            }
        },


        mounted() {
            this.videoInitPlugin(); // 初始化video界面
            this.onLogin();
        },


        destroyed() {
            this.onLogout();
        },



    }
</script>

<style scoped>
    .flex-container {
        display: flex;
    }
    .btn_circle_group button{
        width: 40px;
        height: 40px;
        margin-left: 8px;
        border-radius: 100%;
        outline: none;
        border: 0;
        margin-top: 16px;
    }
    #btn_group button{
        width: 38px;
        height: 38px;
        margin: 20px;
        border-radius: 100%;
        border: 0;
        outline: none;
        background-color: #2a89ea;
    }

</style>
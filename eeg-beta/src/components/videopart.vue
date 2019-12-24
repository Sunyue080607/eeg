<template>
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

</template>


<script>

  import {WebVideoCtrl} from '../assets/js/webVideoCtrl'


  export default {
   data(){
     return{
       hkvInfo: {
         ip:"192.168.1.64",//海康威视摄像头/硬盘录像机的ip地址
         port:"80",//海康威视摄像头/硬盘录像机的端口
         username: "admin",//海康威视摄像头/硬盘录像机的用户名
         password: "hfut1005",//海康威视摄像头/硬盘录像机的密码
       },
     }
   },
    mounted(){
      this.videoInitPlugin(); // 初始化video界面
      this.onLogin();
    },
    destroyed() {
      //this.onLogout();
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
        that.onLogin();
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
  }

</script>

<style scoped>
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

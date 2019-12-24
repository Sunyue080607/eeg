<template>
    <div>
        <el-container>
            <el-header height="100px" style="background-color: #2a89ea;padding: 0">
                <el-row>
                    <el-col :span="23"><div>
                        <img src="../assets/yiyuanlogo.png" alt="">
                    </div></el-col>
                    <el-col :span="1"><div>
                    </div></el-col>
                </el-row>
            </el-header>


            <el-main style="padding: 0">
                <el-container>

                    <el-header height="60px" style="background-color: white;padding: 0">
                   <headNavigation/>
                    </el-header>

                    <el-container>

                    <el-aside width="1450px" style="padding: 20px;;box-sizing: border-box">
                        <div style="background-color: white">
                           <router-view/>
<!--                            <eeg/>-->
<!--                            kkk-->
                        </div>
                    </el-aside>

                    <el-main style="padding-top: 0px;padding-left: 0;;box-sizing: border-box">
                        <div  style="width: 420px">
                            <video-part></video-part>
                            <execption-record/>
                            <button-bottom></button-bottom>
                        </div>
                    </el-main>


                    </el-container>
                </el-container>




            </el-main>
        </el-container>
    </div>




</template>

<script>
    import GlobalMsg from '../global_msg.js'
    import eventBus from "../utils/eventBus";
    import lognPart from '../components/logn-background'
    import headNavigation from '../components/head-navigation'
    import execptionRecord from '../components/execptionrecord'
    import eeg from '../components/heatmap'
    import videoPart from '../components/videopart'
    import buttonBottom from '../components/button-bottom'
    export default {
        name: "videoPage",
        components:{
            headNavigation,
            execptionRecord,
            videoPart,
            lognPart,
            buttonBottom,
            eeg
        },
        mounted() {
            let me=this
            eventBus.$on('feature',function () {
                me.$router.push({path:'/videoPage/featureanalysis'})
            })
            eventBus.$on('back',function () {
                me.$router.push({path:'/videoPage/'})
            })
            // eventBus.$on('feature',()=> {
            //     this.$router.push({path:'/videoPage/featureanalysis'})
            // })//箭头函数会指向所处对象的this（相当于跳出当前所处对象之后所获得的this）

        },
    }
</script>

<style scoped>

</style>
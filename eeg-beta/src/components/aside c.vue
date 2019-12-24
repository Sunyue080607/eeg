<template>
    <div style="height: 800px">

        <div style="margin-left: 20px;margin-top: 70px">
            <el-avatar style="width: 70px;height: 70px" >
                <img  alt="userimg" :src="userUrlimage" >
            </el-avatar>
        </div>

        <div style="margin-top:10px;margin-left: 30px">
            <p style="font-weight: 700;font-size: 25px">{{name}}</p>
        </div>

    <div style="margin-top: 60px;margin-left: 10px">
        <el-button @click="btnClickhome" type="primary"  style="width: 100px;height: 80px;font-size: 20px;padding-top: 18px; color:#999999;background-color: #f7f8fb;border-width: 0px" icon="el-icon-s-home" >
            <div style="font-size: 15px;margin-left:0px;padding-top: 5px;color: #999999">首页
            </div>
        </el-button>
    </div>

        <div style="margin-top: 20px;margin-left: 10px">
            <el-button @click="btnClickappointment" type="primary"  style="width: 100px;height: 80px;font-size: 20px;padding-top: 18px; color:#999999;background-color: #f7f8fb;border-width: 0px" >
                <img alt="aside" src="../assets/aside appointment.png">
                <div style="font-size: 15px;margin-left:0px;padding-top: 5px;color: #999999">门诊预约
                </div>
            </el-button>
        </div>

        <div style="margin-top: 20px;margin-left: 10px">
            <el-button @click="btnClickreporter" type="primary"  style="width: 100px;height: 80px;font-size: 20px;padding-top: 18px;color:#999999;background-color: #f7f8fb;border-width: 0px " icon="el-icon-s-data" >
                <div style="font-size: 15px;margin-left:0px;padding-top: 5px;color: #999999">数据报表
                </div>
            </el-button>
        </div>

        <div style="margin-top: 20px;margin-left: 10px">
            <el-button @click="btnClicksetting" type="primary"  style="width: 100px;height: 80px;font-size: 20px;padding-top: 18px; color:#999999;background-color: #f7f8fb;border-width: 0px" icon="el-icon-s-tools" >
                <div style="font-size: 15px;margin-left:0px;padding-top: 5px;color: #999999">系统设置
                </div>
            </el-button>
        </div>

    </div>
</template>

<script>

    export default {
        name: "aside home",

        data:function () {
            return{
                userUrlimage:'',
                name:""
            }
        },

            methods: {

                btnClickhome: function () {
                    let me=this
                    this.$router.push({path:'/homepage',
                        query:{
                            // username:this.$store.state.username,
                            // imgurl:this.userUrlimage,
                            // authority:me.$route.query.authority,
                            // userId:me.$route.query.userId,
                            username:this.$store.state.username,
                            imgurl:this.$store.state.imgurl,
                            authority:this.$store.state.authority,
                            userId:this.$store.state.userId,
                        }
                    })
                },
                btnClickappointment: function () {
                    let me=this
                    this.$router.push({path:'/appointmentpage',
                        query:{
                            username:this.$store.state.username,
                            imgurl:this.$store.state.imgurl,
                            authority:this.$store.state.authority,
                            userId:this.$store.state.userId,
                        }
                    })
                },
                btnClickreporter: function () {

                    let me=this
                    this.$router.push({path:'/reporterpage',
                        query:{
                            username:this.$store.state.username,
                            imgurl:this.$store.state.imgurl,
                            authority:this.$store.state.authority,
                            userId:this.$store.state.userId,
                        }
                    })

                },
                btnClicksetting: function () {
                    let me=this
                    this.$router.push({path:'/systemset',
                        query:{
                            username:this.$store.state.username,
                            imgurl:this.$store.state.imgurl,
                            authority:this.$store.state.authority,
                            userId:this.$store.state.userId,
                        }
                    })
                },
            },
        mounted() {
            let me=this
                me.name=this.$store.state.username
                me.userUrlimage=this.$store.state.imgurl
                // me.name=this.$route.state.username
                // me.userUrlimage=this.$route.state.imgurl
        }
    }
</script>

<style scoped>

</style>
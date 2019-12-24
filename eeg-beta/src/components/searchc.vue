<template>
    <div class="flex-container" style="margin-top: 10px">
        <span style="width: 70px;color: gray;margin-top: 7px">检查编号</span>
        <el-input size="mini" style="display: inline-block;width: 8%;margin-top: 5px"  v-model="inputid" ></el-input>
        <div style="width: 30px"></div>



        <span style="width: 40px;color: gray;margin-top: 7px">姓名</span>
            <el-input size="mini" style="display: inline-block;width: 8%;margin-top: 5px"  v-model="inputname" ></el-input>
        <div style="width: 30px"></div>


        <span style="width: 75px;color: gray;margin-top: 7px">手机号码</span>
            <el-input size="mini" style="display: inline-block;width: 8%;margin-top: 5px"  v-model="inputphone" ></el-input>
        <div style="width: 20px"></div>
        <div>
            <el-button v-on:click="btnClick()" style="width: 80px;height: 35px;background-color: #2a89ea;color: aliceblue;font-size: 13px;font-weight: 800">搜索</el-button>
        </div>

    </div>
</template>

<script>
    import eventBus from "../utils/eventBus";
    import GlobalMsg from '../global_msg.js'
    import axios from 'axios'
    export default {
        name: "serach input id",
        data() {
            return {
                inputid: '',
                inputname: '',
                inputphone: '',
                filePath:'http://'+GlobalMsg.ip+':8080/home/queryPatient',//测试地址
            }
        },
        methods:{
            btnClick:function () {

                let that = this
                let rconfig={
                    method:'post',
                    url: that.filePath,
                    data:"&patientId="+that.inputid+'&name='+that.inputname+'&phone='+that.inputphone,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                this.$axios(rconfig)
                    .then((response) => {
                        // this.$router.push({path:'/homepage',
                        //     query:{
                        //         searchlist:response.data.data.list
                        //     }
                        // })
                        eventBus.$emit('search',response.data.data.list);

                    }).catch((error) => {
                    console.log(error);
                });

            }
        },

    }
</script>

<style scoped>

    .flex-container {
        display: flex;
        width: 100%;
        height: 60px;
        justify-content: flex-start;
    }



</style>
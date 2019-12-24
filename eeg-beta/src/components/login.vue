<template>
    <div style="width: 550px">
        <img src="../assets/login.png" alt="" style="margin-left: 44px">

        <div style="height: 450px;width: 550px;background-color: white;margin-top: 60px">
            <div style="padding-top: 40px;padding-left: 250px">
                <span style="font-size: 25px;font-weight: 800">登录</span>
            </div>
            <div class="demo-input-suffix" style="width: 360px;height: 45px;margin-left: 95px;margin-top: 40px;">
                <el-input
                        placeholder="输入用户名"
                        v-model="input1">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </div>
            <div class="demo-input-suffix" style="width: 360px;height: 45px;margin-left: 95px;margin-top: 25px;">
                <el-input
                        placeholder="输入密码"
                        v-model="input2">
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </div>
            <div style="margin-left: 375px">
                <el-checkbox v-model="checked" style="font-weight: 800;font-size: 25px" >记住密码</el-checkbox>
            </div>
<!--            <div style="margin-left: 375px">-->
<!--                <el-checkbox v-model="remember" style="font-weight: 800;font-size: 25px" >记住</el-checkbox>-->
<!--            </div>-->


            <div style="width: 360px;height: 45px;margin-left: 95px;margin-top: 40px;">
                <el-button @click="Clicklogin" type="primary" style="width: 360px;font-weight: 700;font-size: 18px">登录</el-button>
            </div>

        </div>

    </div>

</template>

<script>
    import Vue from 'vue'
    import GlobalMsg from '../global_msg.js'
    import { mapState } from "vuex";
    import { mapMutations } from "vuex"

    export default {
        name: "login",
        data: function () {
            return {
                input1: '',
                input2: '',
                checked: '',
                // remember:true
            }
        },

        methods: {
            ...mapMutations(['updateuserId', 'updateusername', 'updateauthority','updateimgurl']),
            test:function(){
                this.$router.push({path:'/paperpage'})
            },
            Clicklogin: function () {



                // normal axios
                // this.$axios({
                //     method:'post',
                //     url:'',
                //     data:'&userName='+this.input1+'&userPassword='+this.input2,
                // }).then().catch()


                // //requestparam
                // let rconfig={
                //     method:'post',
                //     url: that.filePath,
                //     data:"&pageSize="+11+'&pageNum='+1,
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     }
                // };
                //
                // this.$axios(rconfig)
                //     .then((response) => {
                //         that.tableData=response.data.data.list
                //         console.log(response.data.data.list)
                //         that.max=response.data.data.total
                //     }).catch((error) => {
                //     console.log(error);
                // });


                //requestbody
                // let data = {userName: this.input1, userPassword: this.input2}
                // this.$axios.post('http://'+GlobalMsg.ip+':8080/user/login',JSON.stringify(data))
                //     .then((response) => {
                //     }).catch((error) => {
                //     console.log(error);
                // });

                // import { mapState } from "vuex";
                // import { mapMutations } from "vuex"

                // computed:{
                // ...mapState(['graghArr','myChart1vuex','Optionvuex'])
                // },

                // methods: {
                // ...
                //     mapMutations(['updatedata', 'updatedataoption', 'updategraghArr']),
                // that.updategraghArr(transitArr);
                // that.updatedata();
                // that.updatedataoption();
                // }

                //requestbody
                let data = {userName: this.input1, userPassword: this.input2}
                    this.$axios.post('http://'+GlobalMsg.ip+':8080/user/login',JSON.stringify(data))
                        .then((response) => {

                            if(response.data.data.token && response.data.data.tokenHead){
                                localStorage.setItem("token",response.data.data.token)
                                localStorage.setItem("tokenHead",response.data.data.tokenHead)
                            }

                        if(response.data.code==200)
                        {
                            let rconfig={
                                method:'post',
                                url: 'http://'+GlobalMsg.ip+':8080/time/updateTime',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            };

                            this.$axios(rconfig)
                                .then((response) => {

                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            this.updateauthority(response.data.data.user.authority)
                            this.updateusername(this.input1)
                            this.updateimgurl(response.data.data.user.imgHead)
                            this.updateuserId(response.data.data.user.userId)
                            // this.$store.commit('updateusername', this.input1)
                            // this.$store.commit('updateauthority', response.data.data.user.authority)
                            // this.$store.commit('updateimgurl', response.data.data.user.imgHead)
                            // this.$store.commit('updateuserId', response.data.data.user.userId)
                            this.$router.push({path:'/homepage',
                            query:{
                            // username:this.input1,
                            // authority:response.data.data.user.authority,
                            // imgurl:response.data.data.user.imgHead,
                            // userId:response.data.data.user.userId
                        }
                        })
                        if(this.checked&&(!this.$cookies.isKey('user')))
                        {
                            var user = {name:this.input1,pas:this.input2};
                            // this.$cookies.set(this.input1, user,'7d')
                            this.$cookies.set('user', user,'7d')
                        }
                            else if(this.checked&&(this.$cookies.isKey('user')))
                        {

                        }
                            else if(!this.checked&&(this.$cookies.isKey('user')))
                        {
                            this.$cookies.remove('user')
                        }
                            else
                        {

                        }
                        }

            else
                        {
                            this.$alert('账号或密码错误', '登录信息', {
                                confirmButtonText: '确定',
                            });
                            this.input1=''
                            this.input2=''
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                },


            },
        mounted() {

            // console.log(this.$store.state.count)//vuex 使用变量
            if(this.$cookies.isKey('user'))
            {
                this.checked=true
                this.input1=this.$cookies.get('user').name
                this.input2=this.$cookies.get('user').pas
            }
            else
            {
                this.checked=false
            }
        }
    }


</script>

<style>
</style>
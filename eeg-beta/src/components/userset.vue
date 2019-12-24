<template>
    <div style="width: 1750px;height: 800px;background-color: white">
        <el-dialog title="用户信息" :visible.sync="dialogFormVisible1" width="30%" >
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth">
                    <el-input v-model="form.authority" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
<!--                <el-form-item label="用户id" :label-width="formLabelWidth">-->
<!--                    <el-input v-model="form.id" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="btnClickadd">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="修改密码" :visible.sync="dialogFormVisible2" width="30%" >
            <el-form :model="form">

                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="newpassword" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="btnClickchangepassword">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="用户信息" :visible.sync="dialogFormVisible3" width="30%" >
            <el-form :model="form">
            <el-form-item label="编号" :label-width="formLabelWidth">
                <span>{{formuser.doctorId}}</span>
            </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <span>{{formuser.cname}}</span>
                </el-form-item>
                <el-form-item label="权限" :label-width="formLabelWidth">
                    <span>{{formuser.authority}}</span>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <span>{{formuser.gender}}</span>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <span>{{formuser.phone}}</span>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <span>{{formuser.email}}</span>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <span>{{formuser.remarks}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">确定</el-button>
            </div>
        </el-dialog>


        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible4" width="30%" >
            <el-form :model="form">
                <el-form-item label="用户编号" :label-width="formLabelWidth">
                    <el-input v-model="formuser.doctorId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="formuser.cname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="formuser.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户权限" :label-width="formLabelWidth">
                    <el-input v-model="formuser.authority" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户性别" :label-width="formLabelWidth">
                    <el-input v-model="formuser.gender" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="formuser.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="formuser.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="formuser.remarks" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="btnClickchangeinfor">确 定</el-button>
            </div>
        </el-dialog>






        <div style="padding-left: 50px;padding-top: 40px">
            <span style="font-size: 20px;font-weight: bold;">设置我的资料</span>
        <div style="margin-top:10px;background-color: lightgrey;height: 2px;"></div>
        </div>

        <div style="margin-top: 40px">
            <el-row>
                <el-col :span="3"><div style="margin-left: 100px">
                    <span style="color: gray">我的角色</span>
                </div></el-col>
                <el-col :span="2"><div >
                    <span >{{role}}</span>
                </div></el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="3"><div style="margin-left: 100px;padding-top: 8px">
                    <span style="color: gray;">用户名</span>
                </div></el-col>
                <el-col :span="2"><div >
                    <el-input v-model="username" style="border: gray"></el-input>
                </div></el-col>
            </el-row>


            <el-row style="margin-top: 40px">
                <el-col :span="3"><div style="margin-left: 100px;padding-top: 8px">
                    <span style="color: gray;">性别</span>
                </div></el-col>
                <el-col :span="2"style="margin-top: 11px"><div >
                    <el-radio v-model="radio" label="男">男</el-radio>
                    <el-radio v-model="radio" label="女">女</el-radio>
                </div></el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="3"><div style="margin-left: 100px;padding-top: 12px">
                    <span style="color: gray;">头像</span>
                </div></el-col>
                <el-col :span="2"style="margin-top: 3px"><div >

                    <el-upload
                            name="file"
                            list-type="picture"
                            :data="myData"
                            action="http://114.213.212.41:8080/Setup/updateImg"
                            :headers="getHeaders"
                            >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>


                </div></el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="3"><div style="margin-left: 100px;padding-top: 8px">
                    <span style="color: gray;">手机号</span>
                </div></el-col>
                <el-col :span="2"><div >
                    <el-input v-model="phone" style="border: gray"></el-input>
                </div></el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="3"><div style="margin-left: 100px;padding-top: 8px">
                    <span style="color: gray;">邮箱</span>
                </div></el-col>
                <el-col :span="2"><div >
                    <el-input v-model="mail" style="border: gray"></el-input>
                </div></el-col>
            </el-row>

            <el-row style="margin-top: 40px">
                <el-col :span="3"><div style="margin-left: 100px;padding-top: 8px">
                    <span style="color: gray;">备注</span>
                </div></el-col>
                <el-col :span="21"><div >
                    <el-input v-model="remarks" style="border: gray"
                              type="textarea"
                              :rows="5"
                              :cols="65"
                              placeholder="请输入内容"
                            ></el-input>
                </div></el-col>
            </el-row>

            <el-row style="margin-top: 30px;">
                <el-col :span="12">
                    <div style="margin-left: 220px;padding-top: 8px;">
                    <el-button @click="btnClickchange" type="primary" style="background-color: #009688;color:white;border-color: lightgray" >确定修改</el-button>
                        <el-button @click="dialogFormVisible2 = true" type="primary" style="background-color: white;color:black;border-color: lightgray"  >修改密码</el-button>
                    </div>

                </el-col>
            </el-row>
        </div>


        <div v-if="authority" style="height: 450px;width: 1300px;z-index: 9;position:absolute;top: 220px;left: 580px;"  >


            <el-table
                    is-horizontal-resize
                    height="400px"
                    :data="tableData"
                    style="width: 100%;">
                <el-table-column
                        align="center"
                        prop="doctorId"
                        label="编号"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="cname"
                        label="姓名"
                        width="200">
                </el-table-column>
<!--                <el-table-column-->
<!--                        align="center"-->
<!--                        prop="age"-->
<!--                        label="年龄"-->
<!--                        width="180">-->
<!--                </el-table-column>-->
                <el-table-column
                        align="center"
                        prop="gender"
                        label="性别"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="email"
                        label="邮箱"
                        width="200">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phone"
                        label="手机号码"
                        width="200">
                </el-table-column>
                <el-table-column label="操作" align="center"  width="200">
                    <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="userdeleteClick(scope.row)" icon="el-icon-delete" style="border: 0px;"></el-button>
                    <el-button
                            size="mini"
                            @click="userdetailClick(scope.row)" icon="el-icon-document" style="border: 0px"></el-button>
                    <el-button
                            size="mini"
                            @click="btnClickchangeinforsee(scope.row)" icon="el-icon-edit" style="border: 0px"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="z-index: 10;position:absolute;top: 320px;left: 50px">
                <el-pagination
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :current-page.sync="currentPage"
                        page-size=5
                        :total="max">
                </el-pagination>
                <el-col >
                    <div >
                        <el-button @click="dialogFormVisible1 = true" type="primary" style="background-color:white;color:black;border-color: lightgray" >添加用户</el-button>
                    </div>

                </el-col>

            </div>



        </div>



    </div>
</template>

<script>
    import GlobalMsg from '../global_msg.js'
    export default {
        name: "user set",
    data:function () {
        return {
            role:'',
            id:'',
            newpassword:'',
            max:'',
            username:"",
            radio: '男',
            phone: "",
            mail:"",
            remarks:"",
            authority:'',
            currentPage:'',

            dialogFormVisible1: false,
            dialogFormVisible2: false,
            dialogFormVisible3: false,//userdetaildialog
            dialogFormVisible4: false,//changeinfordialog
            form: {
                name: '',
                phone: '',
                sex: '',
                id: '',
                email:'',
                password:'',
                authority:''
            },
            formuser: {
                doctorId: "",
                cname: "",
                passwd: "",
                authority: '',
                imgHead: "",
                gender: "",
                phone: "",
                email: "",
                remarks: null
            },
            formLabelWidth: '120px',
            tableData: []
        }
    } ,


        computed:{
            myData(){
                return {
                    "doctorId":this.id,

                }
            },
            getHeaders(){
                console.log(localStorage.getItem("tokenHead")+localStorage.getItem("token"))
                if(localStorage.getItem("token") && localStorage.getItem("tokenHead")){
                    return {
                        "Authorization":localStorage.getItem("tokenHead")+localStorage.getItem("token"),

                    }

                }
            },

        },



        methods:{


            handleCurrentChange:function(val){
                let that = this
                let rconfig={
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorInfoByPage',
                    data:"&pageSize="+5+'&pageNum='+val,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                //requestparam
                this.$axios(rconfig)
                    .then((response) => {
                        this.tableData=response.data.data.list
                        this.max=response.data.data.total
                    }).catch((error) => {
                    console.log(error);
                });




            },


            userdeleteClick:function (row) {
                let that = this
                let rconfig={
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/Setup/deleteUser',
                    data:"&doctorId="+row.doctorId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                this.$axios(rconfig)
                    .then((response) => {
                        console.log("success")
                        let rconfig2={
                            method:'post',
                            url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorInfoByPage',
                            data:"&pageSize="+5+'&pageNum='+that.currentPage,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        //requestparam
                        this.$axios(rconfig2)
                            .then((response) => {
                                that.tableData=response.data.data.list
                                that.max=response.data.data.total
                            }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                    console.log(error);
                });



            },

            userdetailClick:function (row) {
                let me=this
                this.dialogFormVisible3=true
                let rconfig={
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorUserInfo',
                    data:"&doctorId="+row.doctorId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                //requestparam

                this.$axios(rconfig)
                    .then((response) => {
                        console.log(rconfig)
                        console.log(response)
                        me.formuser.doctorId=response.data.data.doctorId
                        me.formuser.cname=response.data.data.cname
                        me.formuser.passwd=response.data.data.passwd
                        me.formuser.authority=response.data.data.authority
                        me.formuser.remarks=response.data.data.remarks
                        me.formuser.gender=response.data.data.gender
                        me.formuser.phone=response.data.data.phone
                        me.formuser.email=response.data.data.email
                    }).catch((error) => {
                    console.log(error);
                });





            },


            btnClickchange: function () {
            let data = {cname: this.username,gender:this.radio,phone:this.phone,email:this.mail,doctorId:this.id,remarks:this.remarks}
                this.$axios.post('http://'+GlobalMsg.ip+':8080/Setup/update',JSON.stringify(data))
                    .then((response) => {

                    }).catch((error) => {
                    console.log(error);
                });




            },
            btnClickadd: function () {
                let me=this
                me.dialogFormVisible1 = false
                let data = {cname: me.form.name, passwd:me.form.password,authority:me.form.authority,gender:me.form.sex,phone:me.form.phone,email:me.form.email}
                this.$axios.post('http://'+GlobalMsg.ip+':8080/Setup/addUser',JSON.stringify(data))
                    .then((response) => {
                        let rconfig2={
                            method:'post',
                            url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorInfoByPage',
                            data:"&pageSize="+5+'&pageNum='+me.currentPage,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        //requestparam
                        this.$axios(rconfig2)
                            .then((response) => {
                                me.tableData=response.data.data.list
                                me.max=response.data.data.total
                            }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                    console.log(error);
                });

            },
            btnClickchangeinfor:function(){
                this.dialogFormVisible4=false
                let me=this

                // requestbody
                let data = {doctorId: this.formuser.doctorId, cname: this.formuser.cname,passwd:this.formuser.passwd,
                    authority:this.formuser.authority,gender:this.formuser.gender,phone:this.formuser.phone,
                    email:this.formuser.email,remarks:this.formuser.remarks
                }
                this.$axios.post('http://'+GlobalMsg.ip+':8080/Setup/updateOtherUser',JSON.stringify(data))
                    .then((response) => {
                        let rconfig2={
                            method:'post',
                            url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorInfoByPage',
                            data:"&pageSize="+5+'&pageNum='+me.currentPage,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        };
                        //requestparam
                        this.$axios(rconfig2)
                            .then((response) => {
                                me.tableData=response.data.data.list
                                me.max=response.data.data.total
                            }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((error) => {
                    console.log(error);
                });

            },
            btnClickchangeinforsee: function (row) {
                this.dialogFormVisible4=true
                let me=this
                let rconfig={
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorUserInfo',
                    data:"&doctorId="+row.doctorId,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                //requestparam

                this.$axios(rconfig)
                    .then((response) => {
                        console.log(response)
                        me.formuser.doctorId=response.data.data.doctorId
                        me.formuser.cname=response.data.data.cname
                        me.formuser.passwd=response.data.data.passwd
                        me.formuser.authority=response.data.data.authority
                        me.formuser.remarks=response.data.data.remarks
                        me.formuser.gender=response.data.data.gender
                        me.formuser.phone=response.data.data.phone
                        me.formuser.email=response.data.data.email
                    }).catch((error) => {
                    console.log(error);
                });
            },
            btnClickchangepassword: function () {
                let me=this
                me.dialogFormVisible2=false


                let data = {doctorId: this.id, passwd: this.newpassword}
                this.$axios.post('http://'+GlobalMsg.ip+':8080/Setup/updatePassword',JSON.stringify(data))
                    .then((response) => {
                        console.log(response)
                    }).catch((error) => {
                    console.log(error);
                });
            },


            },
        mounted() {
            // this.authority=this.$route.query.authority
            // this.id=this.$route.query.userId
            // this.username=this.$route.query.username
            this.authority=this.$store.state.authority
            this.id=this.$store.state.userId
            this.username=this.$store.state.username
            if(this.authority==1)
            {this.role="超级管理员"+this.id}
            else
              {this.role="普通用户"+this.id
              }


            this.$axios({
                method:'post',
                url:'http://'+GlobalMsg.ip+':8080/Setup/getDoctorUserInfo',
                data:'&doctorId='+this.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }) .then((response) => {

                this.mail=response.data.data.email
                this.phone=response.data.data.phone
                this.radio=response.data.data.gender
                this.remarks=response.data.data.remarks
            }).catch((error) => {
                console.log(error);
            });


            let rconfig={
                method:'post',
                url: 'http://'+GlobalMsg.ip+':8080/Setup/getDoctorInfoByPage',
                data:"&pageSize="+5+'&pageNum='+1,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            //requestparam

            this.$axios(rconfig)
                .then((response) => {
                   console.log(response.data.data.list)
                    this.tableData=response.data.data.list
                    this.max=response.data.data.total
                }).catch((error) => {
                console.log(error);
            });
        }
    }
</script>

<style scoped>



</style>
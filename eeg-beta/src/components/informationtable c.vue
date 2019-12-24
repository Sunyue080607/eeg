<template>
    <div style="background-color: white;height: 690px;margin-left: 20px;padding-top: 20px">
    <el-table

            :header-cell-style="tableHeaderColor"
            is-horizontal-resize
            height="625px"
            :data="tableData"
            style="width: 100%;">
        <el-table-column
                align="center"
                prop="patientId"
                label="检查编号"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="old"
                label="年龄"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="gender"
                label="性别"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="checkTime"
                label="检查日期"
                width="180">
        </el-table-column>
        <el-table-column
                align="center"
                prop="phone"
                label="手机号码"
                width="180">
        </el-table-column>
        <el-table-column label="操作" align="center"  width="180">
            <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="deleteClick(scope.row)" icon="el-icon-delete" style="border: 0px;"></el-button>
            <el-button
                    size="mini"
                    @click="detailClick(scope.row)" icon="el-icon-document" style="border: 0px"></el-button>
            </template>
        </el-table-column>
    </el-table>

        <div class="flex-container" style="margin-top: 15px;height: 50px">
            <button v-on:click="homeClick()" style="width: 80px;height: 30px;font-size: 10px;border-width: 0;background-color: white" >首页</button>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    page-size=11
                    layout="prev, pager, next ,jumper"
                    :total="max">
            </el-pagination>
            <button v-on:click="lastClick()" style="width: 80px;height: 30px;font-size: 10px;border-width: 0;background-color: white">尾页</button>
        </div>

    </div>
</template>

<script>
    import eventBus from "../utils/eventBus";
    import GlobalMsg from '../global_msg.js'
    import axios from 'axios'
    import { mapMutations } from "vuex"

    export default {
        name: "informationtable",
        data() {
            return {
                max:0,
                tableData: [],
                filePath:'http://'+GlobalMsg.ip+':8080/home/patientList',//测试地址
                deletefilePath:'http://'+GlobalMsg.ip+':8080/home/deletePatient',//测试地址
                currentPage:1
            }
        },

        methods: {
            ...mapMutations(['updatepatientname','updatepatientage']),
            handleCurrentChange(val) {
                console.log('changechangechange')
                // ${val}
                console.log(`${val}`)
                let that = this
                let rconfig={
                    method:'post',
                    url: that.filePath,
                    data:"&pageSize="+11+'&pageNum='+val,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                //requestparam
                this.$axios(rconfig)
                    .then((response) => {
                        that.tableData=response.data.data.list
                        that.max=response.data.data.total
                    }).catch((error) => {
                    console.log(error);
                });


                eventBus.$on('search',(arg)=>{
                    that.tableData=arg
                })

            },
            deleteClick: function (row) {
                let that = this
                let rconfig={
                    method:'post',
                    url: that.deletefilePath,
                    data:"&patientId="+row.patientId+'&checkTime='+row.checkTime,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                this.$axios(rconfig)
                    .then((response) => {
                        console.log("success")

                        let rconfig2={
                            method:'post',
                            url: that.filePath,
                            data:"&pageSize="+11+'&pageNum='+that.currentPage,
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
                        eventBus.$on('search',(arg)=>{
                            that.tableData=arg
                        })



                    }).catch((error) => {
                    console.log(error);
                });

            },
            detailClick: function (row) {

                let that = this
                this.updatepatientname(row.name)
                this.updatepatientage(row.old)
                this.$router.push({path:'/paperpage',
                    query:{
                        // name:row.name,
                        id:row.patientId,
                        // age:row.old,
                        doctorId:this.$store.state.userId
                    }
                })
            },

            homeClick: function () {
                this.currentPage=1
                let that = this
                let rconfig={
                    method:'post',
                    url: that.filePath,
                    data:"&pageSize="+11+'&pageNum='+1,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                //requestparam
                this.$axios(rconfig)
                    .then((response) => {
                        that.tableData=response.data.data.list
                        console.log(response.data.data.list)
                        that.max=response.data.data.total
                    }).catch((error) => {
                    console.log(error);
                });
                eventBus.$on('search',(arg)=>{
                    that.tableData=arg
                })

            },
            lastClick: function () {
                this.currentPage=Math.ceil(this.max/11);
                let that = this
                let rconfig={
                    method:'post',
                    url: that.filePath,
                    data:"&pageSize="+11+'&pageNum='+Math.ceil(that.max/11),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                //requestparam
                this.$axios(rconfig)
                    .then((response) => {
                        that.tableData=response.data.data.list
                        console.log(response.data.data.list)
                        that.max=response.data.data.total
                    }).catch((error) => {
                    console.log(error);
                });
                eventBus.$on('search',(arg)=>{
                    that.tableData=arg
                })
            },
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: black;color:black'
                }
            },
            dateToFormat(date){

            }

        },
        mounted() {
            let that = this
            let rconfig={
                method:'post',
                url: that.filePath,
                data:"&pageSize="+11+'&pageNum='+1,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            //requestparam

            this.$axios(rconfig)
                .then((response) => {
                   that.tableData=response.data.data.list
                    that.max=response.data.data.total
                }).catch((error) => {
                console.log(error);
            });
            eventBus.$on('search',(arg)=>{
                that.tableData=arg
            })

        }
    }
</script>

<style scoped>
    .flex-container {
        display: flex;
        width: 100%;
        height: 60px;
        justify-content: flex-start;
    }
    .el-table__row>td{
        border: none;
    }
    .el-table::before {
    height: 0px;
    }


</style>
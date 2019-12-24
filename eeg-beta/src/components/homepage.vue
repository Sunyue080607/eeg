<template>

    <div >
        <el-container>


            <el-header height="100px" style="background-color: #2a89ea;padding: 0">
                <el-row>
                    <el-col :span="23"><div>
                        <img src="../assets/yiyuanlogo.png" alt="">
                    </div></el-col>
                    <el-col :span="1"><div>
                        <exit/>
                    </div></el-col>
                </el-row>
            </el-header>

            <el-main style="padding: 0;margin: 0;box-sizing: border-box ">
            <el-container>

                <el-aside width="130px" style="background-color: white">
                    <asidelist />
                </el-aside>


                <el-main style="padding: 0;margin: 0;box-sizing: border-box ">

                    <el-container>


                        <el-header height="60px" style="background-color:white;padding: 0">
                            <el-row style="padding-left:20px ">
                                <el-col :span="22">
                                    <div>
                                        <search/>
                                    </div>
                                </el-col>

                                    <div style="float: right">
                                    <addpatient/>
                                    </div>
                            </el-row>
                        </el-header>


                        <el-main style="background-color:#f7f8fb;padding: 0 ">
                            <el-container>

                                <el-aside width="1390px" style="padding: 20px;;box-sizing: border-box">
                                    <div style="background-color: white">
                                        <informationtable/>
                                    </div>
                                </el-aside>



                                <el-main style="padding-top: 20px;padding-left: 0;;box-sizing: border-box">
                                    <todaypie/>
                                    <system/>
                                </el-main>
                            </el-container>
                        </el-main>

                        <el-footer height="40px" style="background-color: #f7f8fb;padding-top: 0px">
                            <span style="color: gray;font-size: 12px;margin-left: 675px;">中国电子科技集团公司第三十八所研究院版权所有</span>
                        </el-footer>
                    </el-container>
                </el-main>

            </el-container>
            </el-main>
        </el-container>
    </div>

</template>


<script>
    import addpatient from "../components/addpatient c"
    import asidelist from "../components/aside c"
    import exit from "./exitc"
    import informationtable from "../components/informationtable c"
    import search from "./searchc"
    import system from "./Systemstatisticspie-chartc"
    import todaypie from "./todaypie-chartc"
    export default {
        name: "frist page",
        components:{
            addpatient,
            asidelist,
            exit,
            informationtable,
            search,
            system,
            todaypie
        },
        mounted() {

        }
    }
</script>

<style scoped>



</style>
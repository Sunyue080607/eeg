<template>
    <div>
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


            <el-main style="padding: 0">
                <el-container>

<!--                    <el-header height="60px" style="background-color: white;padding: 0">-->
<!--                        <el-row style="padding-left:0px ">-->
<!--                            <el-col :span="15">-->
<!--                                <div>-->
<!--                                    <returnandname/>-->
<!--                                </div>-->
<!--                            </el-col>-->

<!--                            <div style="float: right;margin-top: 12.5px;margin-right: 10px">-->
<!--                                <pcs/>-->
<!--                            </div>-->
<!--                        </el-row>-->
<!--                    </el-header>-->


                    <el-main style="background-color:white;padding-top: 0px;padding-left: 0px;padding-right: 0px">
                        <paper/>
                    </el-main>

                </el-container>
            </el-main>


        </el-container>
    </div>
</template>

<script>
    // import returnandname from "../components/return"
    // import pcs from "../components/print change save"
    import exit from "./exitc"
    import paper from "../components/wordParent"
    export default {
        name: "paper page",
        components:{

            paper,
            // returnandname,
            // pcs,
            exit
        }
    }
</script>

<style scoped>

</style>
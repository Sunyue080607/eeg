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


                    <el-aside width="130px" style="background-color: white">
                        <asidelist />
                    </el-aside>

                    <el-main style="background-color:#f7f8fb;">
                        <div style="background-color: white;height: 800px">
                            <appointment />
                        </div>

                    </el-main>


                </el-container>
            </el-main>






        </el-container>
    </div>
</template>

<script>
    import exit from "./exitc"
    import asidelist from "../components/aside c"
    import appointment from "../components/yuyuepage"

    export default {
        name: "appointment page",
        components:{
            exit,
            asidelist,
            appointment

        }
    }
</script>

<style scoped>

</style>
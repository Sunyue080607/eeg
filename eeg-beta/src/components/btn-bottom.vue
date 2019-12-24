<template>
    <div class="btn_in_bottom">
        <el-row type="flex" justify="space-around">
            <el-button type="primary"  @click="start">开始</el-button>
            <el-button type="primary" @click="stop">结束</el-button>
            <el-button type="primary"  @click="generateReport">生成报告</el-button>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "btn-bottom",
        methods: {
            start:function(){

            },
            generateReport: function () {
                this.$router.push({path:'/paperpage'})
            },
            stop:function () {
                this.$router.push({path:'/homepage'})
            }
        }
    }
</script>

<style>

    .btn_in_bottom{
        width: 450px;
    }
    .el-button--primary{
        width: 118px;
        height: 36px;
    }
</style>
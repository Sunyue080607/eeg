<template>
    <div>
        <el-row :gutter="40">
            <el-col :span="8"><el-button type="primary" @click="start">开始</el-button></el-col>
            <el-col :span="8"><el-button type="primary" @click="end">结束</el-button></el-col>
            <el-col :span="8"><el-button type="primary" @click="paper">生成报告</el-button></el-col>
        </el-row>
    </div>
</template>

<script>
    import eventBus from "../utils/eventBus";
    export default {
        name: "button-bottom",
        methods: {
            start:function(){
                eventBus.$emit('starteeg');
            },
            paper:function () {
                this.$router.push({path:'/paperpage'})
            },
            end:function () {
                eventBus.$emit('endeeg');
            }

        }
    }
</script>

<style scoped>
    .el-button--primary{
        width: 120px;
    }
</style>
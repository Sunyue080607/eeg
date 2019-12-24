<template>
    <div style="height: 60px" class="flex-container">
        <button  style="width: 80px;height: 31px" class="select">特诊分析</button>
        <button  style="width: 80px;height: 31px" class="unselect">导联选择</button>
        <el-cascader
                size="small"
                style="width: 80px"
                placeholder="调幅"
                v-model="value"
                :options="options"
                @change="handleChange"></el-cascader>
        <el-button style="height: 40px" icon="el-icon-search" circle></el-button>
        <el-button style="height: 40px;background-image: url(../assets/user.png);"   circle></el-button>
        <el-button style="height: 40px" icon="el-icon-search" circle></el-button>
        <button  style="width: 80px;height: 31px" class="select">打印</button>
    </div>
</template>

<script>
    export default {
        name: "map set",

        data:function () {
            return {

            }
        },
        methods: {
            btnClickhome: function () {

            },
            btnClickappointment: function () {

            },
            btnClickreporter: function () {

            },
            btnClicksetting: function () {

            },
        }
    }
</script>

<style scoped>
    .flex-container {
        display: flex;

    }
    .select{
        background-color: #2a89ea;
        border: 0;
        color: white;
    }
    .unselect{
        color: gray;
        border: 0;
    }
    .el-cascader el-cascader--small.el-input el-input--small el-input--suffix .el-input__inner{
        background-color: gray;
    }


</style>
<template>
    <div style="width: 400px;height: 60px" class="flex-container">
        <el-button @click="btnClickreturn" type="primary"  style="width: 130px;height: 60px;font-size: 20px;padding:0px;background-color: #f7f8fb;border-width: 0px" >
            <img alt="aside" src="../assets/return.png">
        </el-button>
        <div style="margin-left: 20px;" class="flex-container">
            <p style="font-size: 15px;color: gray;margin-top: 21.5px">当前病人：</p>
            <span style="font-size: 16px;margin-top: 21.5px;font-weight: 600">{{name}}</span>
            <span style="font-size: 16px;margin-top: 21.5px;font-weight: 600;margin-left: 10px">{{age}}岁</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "return",

        data:function () {
            return{
                age:'56',
                name:"楚江"
            }
        },

        methods: {
            btnClickreturn: function () {
                this.$router.push({path:'/homepage'})
            },

        }
    }
</script>

<style scoped>
    .flex-container {
        display: flex;
    }
</style>
<template>
    <div style="width: 240px;height: 35px" class="flex-container">
        <button class="button1" @click="btnClickprint">打印</button>
        <button class="button1" @click="btnClickchange" >修改</button>
        <button class="button2" @click="btnClicksave">保存入库</button>
    </div>
</template>

<script>
    export default {
        name: "print change save",

        methods: {
            btnClickprint: function () {

            },
            btnClickchange: function () {

            },
            btnClicksave: function () {

            },

        }
    }
</script>

<style scoped>
    .button1{
        width: 80px;
        border: 0;
        background-color: #EFF1F6;
    }
    .button2{
        width: 80px;
        border: 0;
        background-color: #2A89EA;
        color: white;
    }
    .flex-container {
        display: flex;
    }
</style>
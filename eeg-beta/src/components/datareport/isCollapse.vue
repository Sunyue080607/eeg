<template>
    <div style="display: flex;align-items: center;">
        <div>
            <i class="arrow" :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="passIscollape"></i>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                isCollapse: true
            }
        },
        name: "isCollapse",
        methods:{
            passIscollape:function () {
                this.isCollapse=!this.isCollapse;
                this.$emit('showIscape',this.isCollapse)
                console.log("测试此时isCollapse1的值",this.isCollapse)
            }
        }
    }
</script>

<style scoped>
    .arrow{
        color: #66B1FF;
        font-size: 18px;
        font-weight: bold;
        right: 50px;
        height: 20px;
        width: 20px;
        background:transparent;
    }

</style>
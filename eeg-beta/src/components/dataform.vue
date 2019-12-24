<template>
    <div style="padding: 30px;height: 700px;background:#F7F8FB">
<!--        background:#F7F8FB-->
<!--        <el-row>-->
            <div>
                <dataformLine></dataformLine>
            </div>


            <div style="margin-top: 20px">
                <dataformSum></dataformSum>
            </div>
            <div style="display: flex;margin-top: 20px">
                <div style="display: flex" class="spanGragh" :class="{activeSpan:isActiveSpan}">
                    <div style="width: 100%">
                            <!--                        <el-card class="box-card">-->
                            <div class="text item" style="display:flex;flex:3;align-items:center;justify-content: center;background:white;width: 100%">
                                <dataformGragh1  :width="width" height="240px" id="C1"></dataformGragh1>
                            </div>
                            <!--                        </el-card>-->
                            <!--                        <el-card class="box-card">-->
                            <div class="text item" style="display:flex;flex:1;align-items:center;justify-content: center;background:white;margin-top: 20px;width:100%;">
                                <dataformGragh2  :width="width" height="240px" id="C2"></dataformGragh2>
                            </div>
                            <!--                        </el-card>-->
                    </div>
                    <isCollapse msg="from Calendarmsg" @showIscape="showIscape"></isCollapse>
                </div>

                <div class="Calendar" :class="{activeSpan2:isActiveSpan2}">
                    <div style="display: flex;align-items: center">
                        <dataformCalendar v-if="isCollapse2"></dataformCalendar>
                    </div>
                </div>
            </div>
<!--        </el-row>-->

    </div>


</template>


<script>
    import dataformLine from "../components/datareport/dataform-line"
    import dataformSum from "../components/datareport/dataformSum"
    import dataformGragh1 from "../components/datareport/dataformGragh1"
    import dataformGragh2 from "../components/datareport/dataformGragh2"
    import dataformCalendar from "../components/datareport/dataformCalendar"
    import isCollapse from "../components/datareport/isCollapse";
    export default {
        name:"dataform",
        data() {
            return {
                isCollapse2:true,
                isActiveSpan:false,
                isActiveSpan2:false,
                width:"100%"
            }
        },
        components:{
            dataformLine,
            dataformSum,
            dataformGragh1,
            dataformGragh2,
            dataformCalendar,
            isCollapse
        },
        methods:{
            showIscape(val){
                this.isCollapse2=val,
                this.isActiveSpan=!val,
                this.isActiveSpan2=!val,
                this.width="",
                console.log("传输过来的值",this.isCollapse2,this.isActiveSpan2,this.isActiveSpan)
            }
        },
        mounted() {
            console.log(this.isCollapse2)
        }

    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {

    }
    .bg-purple {

    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 1px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .spanGragh{
        width: 75%;
    }
    .activeSpan{
        width: 100% !important;
    }
    .Calendar{
        width: 25%;
    }
    .activeSpan2{
        width: 0% !important;
    }

</style>
<template>
    <div class="headNav_container" >
        <el-row>
            <el-col :span="15">
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
            </el-col>
            <el-col :span="6">
               <div class="btn_group">
                   <el-button-group>
                       <el-button size="mini" @click="btnClickfeature">特征分析</el-button>
                       <el-button size="mini">导联选择</el-button>
                       <el-dropdown size="mini" placement="top" @command="handleCommand">
                           <el-button size="mini">调幅
                               <i class="el-icon-arrow-down el-icon--right"></i>
                           </el-button>
                           <el-dropdown-menu slot="dropdown" >
                               <el-dropdown-item command="20">20毫伏</el-dropdown-item>
                               <el-dropdown-item command="50">50毫伏</el-dropdown-item>
                               <el-dropdown-item command="100">100毫伏</el-dropdown-item>
                               <el-dropdown-item command="150">150毫伏</el-dropdown-item>
                               <el-dropdown-item command="200">200毫伏</el-dropdown-item>
                               <el-dropdown-item command="500">500毫伏</el-dropdown-item>
                               <el-dropdown-item command="1000">1000毫伏</el-dropdown-item>
                               <el-dropdown-item command="2000">2000毫伏</el-dropdown-item>

                           </el-dropdown-menu>
                       </el-dropdown>
                   </el-button-group>
               </div>
            </el-col>

            <el-col :span="2">
                <div class="btn_circle_group">
                    <button><img src="../assets/toLeft.png" style="margin-top: 1px" @click="left"></button>
                    <button><img src="../assets/pause.png" style="margin-top: 2px;margin-right: 1px" @click="pause"></button>
                    <button><img src="../assets/toRight.png" style="margin-left:3px;margin-top: 2px" @click="right"></button>
                </div>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" size=mini style="margin-top:10px">打印</el-button>
            </el-col>

        </el-row>
    </div>

</template>



<script>
    import eventBus from "../utils/eventBus";
    export default {
        data() {
            return{
                name:'',
                age:'',
                flag:1,
            }
        },

        components:{
        },
        methods:{
            btnClickreturn:function () {
                this.$router.push({path:'/homepage'})
            },
            btnClickfeature:function () {
                if(this.flag==1)
                {
                    eventBus.$emit('back');
                    this.flag=0
                }
                else
                {
                    eventBus.$emit('feature');
                    this.flag=1
                }

            },
            handleCommand(command) {
                eventBus.$emit('zoom',command);
            },
            left:function () {
                eventBus.$emit('left');
            },
            pause:function () {
                eventBus.$emit('endeeg');
            },
            right:function () {
                eventBus.$emit('right');
            },
        },
        mounted() {
            this.name=this.$store.state.patientname
            this.age=this.$store.state.patientage
        }
    }
</script>
<style scoped>
    .headNav_container{
        height: 150px;
    }
    .btn_group{
        margin-top: 10px;
    }
    .btn_circle_group{
        display: flex;
        margin-top: 10px;

    }
    .btn_circle_group button{
        width: 32px;
        height: 32px;
        margin-left: 8px;
        margin-left: 8px;
        border-radius: 100%;
        outline: none;
        border: 0;
    }
    .flex-container {
        display: flex;
    }
    
</style>
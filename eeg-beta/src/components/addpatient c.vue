<template>
    <div>
        <el-button @click="dialogFormVisible = true" style="padding-left: 13px; height:60px;width: 110px;background-color:#fda400;font-size: 15px;color: cornsilk" icon="el-icon-user-solid ">新增病人</el-button>
        <el-dialog title="病人信息" :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="病人姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="病人性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="病人年龄" :label-width="formLabelWidth">
                    <el-input v-model="form.old" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="btnClickconfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import GlobalMsg from '../global_msg.js'
    export default {
        name: "addpatient",

        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    phone: '',
                    sex: '',
                    old: '',
                },
                formLabelWidth: '100px'
            };
        },

        methods: {
            btnClickconfirm: function () {
                let me=this
                me.dialogFormVisible = false
                this.$router.push({path:'/videoPage'})
                // let data = {name: me.form.name,gender:me.form.sex,old:me.form.old,phone:me.form.phone}
                // this.$axios.post('http://'+GlobalMsg.ip+':8080/home/addPatient',JSON.stringify(data))
                //     .then((response) => {
                //         console.log('good')
                //     }).catch((error) => {
                //     console.log(error);
                // });
            },
        }
    }
</script>

<style scoped>

</style>
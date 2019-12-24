<template>
    <div>
        <el-button v-on:click="btnClickexit()" type="primary" icon="el-icon-switch-button" style="font-size: 30px;background-color:#2a89ea;width: 100px;height: 100px;border-width:0 "> </el-button>
    </div>

</template>

<script>
    import GlobalMsg from '../global_msg.js'
    export default {
        name: "exit",
        methods: {
            btnClickexit: function () {
                let rconfig={
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/time/tadayUseTime',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                this.$axios(rconfig)
                    .then((response) => {
                    }).catch((error) => {
                    console.log(error);
                });
                this.$router.push({path:'/loginpage'})

            },
        }
    }
</script>

<style scoped>

</style>
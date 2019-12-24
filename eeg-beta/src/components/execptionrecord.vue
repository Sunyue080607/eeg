<template>
  <div class="sort_table">
    <div class="record_head">
       <el-row type="flex">
           <h3>异常记录</h3>
           <div><h6>{{tableData.length}}条异常记录</h6></div>
          <div>
              <el-button  id=btn_top1  @click="sortByTruth" :type="btn_top1" >置信度排序</el-button>
              <el-button  id=btn_top2 @click="sortByTime" :type="btn_top2">时间排序</el-button>
          </div>
       </el-row>
    </div>
      <div>
          <el-table
                  :show-header="false"
                  :data="tableData"
                  max-height="250px"
                  :cell-style="{
                  padding:0,
                  fontWeight:600,
                  height:0+'px'
                  }"
          >
<!--              {{scope.row.beginWave}}-->
              <el-table-column>
                  <template slot-scope="scope">
                      PA{{scope.row.channelIndex}}在{{scope.row.message}}
                  </template>
              </el-table-column>
              <el-table-column prop="errRank" label="评分"  sortable="true" sort-by="evaValue">
                  <template slot-scope="scope" >
                      <el-rate v-model="scope.row.errRank" :allow-half="true"  disabled text-color="#ff9900" ></el-rate>
                  </template>
              </el-table-column>

              <el-table-column fixed="right" width="50" label="操作">
                  <template slot-scope="scope">
                      <el-button @click="showDate(scope.row)" type="text" size="small">查看</el-button>
                  </template>
              </el-table-column>
          </el-table>
      </div>

  </div>

</template>
<script>
    import GlobalMsg from '../global_msg.js'
    export default {
        name: "record",
        data() {
            return {
                btn_top1: "primary",
                btn_top2: "",
                tableData: []

            }
        },
        created(){

            // //requestparam
            let rconfig={
                method:'post',
                url: 'http://'+GlobalMsg.ip+":8080/user/getErrWaves",
                data:"&patientId="+'BH20191207004',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            this.$axios(rconfig)
                .then((response) => {
                    console.log(response);
                    for(let k of response.data.data.errWaves){
                        this.tableData.push(k)
                    }
                    console.log(this.tableData)
                }).catch((error) => {
                console.log(error);
            });
            // let that=this;
            // that.$axios({
            //     method: "post",
            //     url:'http://'+GlobalMsg.ip+":8080/user/getErrWaves",
            //     data:'&eegId='+'BH20191207004',
            //     headers:{
            //         'Content-Type':'application/x-www-form-urlencoded'
            //     }
            // }).then((res)=>{
            //     console.log(this.res.code)
            //     if(this.res.status==200){
            //         console.log("xxxxx"+res.data.data)
            //         that.tableData.push(res.data.data)
            //     }
            // })

        },
        mounted:{
            getTotal(){
                let total=this.tableData.length;
                return total;
            }

        },
        methods: {
            sortByTruth(){
                this.btn_top1="primary";
                this.btn_top2=""
                this.tableData.sort(function (obj1,obj2) {
                    let value1=obj1.errRank;
                    let value2=obj2.errRank;
                    return value1-value2

                })
            },
            sortByTime(){
                this.btn_top1="";
                this.btn_top2="primary";
                this.tableData.sort(function (obj1,obj2) {
                    let time1=obj1.message
                    let time2=obj2.message
                    if(time1<time2){
                        return -1
                    }else if(time1>time2){
                        return 1
                    }
                })
            }
            },


    }

</script>

<style scoped>
    .sort_table{
        width: 460px;
        height: 350px;
        margin: 0px;
    }
    .record_head{
        height: 60px;
    }
    h3{
        margin-left: 5px;
        margin-right: 15px;
        margin-top: 23px;
        font-family:Georgia, serif;
        font-weight:900
    }
    h6{
        vertical-align: center;
        color: red;
        margin-right: 30px;
        margin-top: 25px;
    }
    #btn_top1,#btn_top2{
        width: 110px;
        height: 35px;
        margin-right: -10px;
        margin-top: 15px;
        margin-bottom: 30px;
    }
   .active{
       background-color: blue;
   }


    .el-table__header-wrapper {
        height: 2px;
    }

    .btn_bottom{
        margin-top: 10px;
    }




</style>
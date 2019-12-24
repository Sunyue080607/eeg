<template>
    <div style="width: 600px;height: 774px;background-color: white">
        <div>
           <div class="tittle" style="padding-top: 30px">
               安徽省立医院安徽省立体定向神经外科研究所
           </div>
            <div class="tittle">
               视频脑电图检查报告
           </div>
        </div>

        <div style="margin: 0 auto;margin-top: 35px;height: 625px;width: 480px">
        <table  height="185" width="480" cellspacing="0" align="center" style="table-layout:fixed; word-wrap:break-word; word-wrap: break-word;border-collapse:collapse;">
            <tr align="center">
                <td style=" background-color: #F7F8FB;border:1px solid lightgray;"> 姓名</td>
                <td contentEditable="true" style="border:1px solid lightgray;"></td>
                <td style=" background-color: #F7F8FB;border:1px solid lightgray;">脑电图号</td>
                <td contentEditable="true" style="border:1px solid lightgray;"></td>
            </tr>
            <tr align="center">
                <td class="littletittle">性别</td>
                <td contentEditable="true" class="littleinput"></td>
                <td class="littletittle">监测日期</td>
                <td contentEditable="true" class="littleinput"></td>
            </tr>
            <tr align="center">
                <td class="littletittle">年龄</td>
                <td contentEditable="true" class="littleinput"></td>
                <td class="littletittle">科别</td>
                <td contentEditable="true" class="littleinput"></td>
            </tr>
            <tr align="center">
                <td class="littletittle">睡眠方式</td>
                <td contentEditable="true" class="littleinput"></td>
                <td class="littletittle">病区床号</td>
                <td contentEditable="true" class="littleinput"></td>
            </tr>

        </table>
            <table border="0" height="" width="" cellspacing="0" align="center" style="table-layout:fixed; word-wrap:break-word; word-wrap: break-word;border-collapse:collapse;border-top:0">
                <tr align="center">
                    <td width="119px" height="50px" class="littletittle">临床诊断</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
                <tr align="center">
                    <td width="119px" height="100px" class="littletittle"> 背景活动</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
                <tr align="center">
                    <td width="119px" height="50px" class="littletittle">过度唤气</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
                <tr align="center">
                    <td width="119px" height="50px" class="littletittle">睡眠期</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
                <tr align="center">
                    <td width="119px" height="100px" class="littletittle">异常波</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
                <tr align="center">
                    <td width="119px" height="50px" class="littletittle">临床发作</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
                <tr align="center">
                    <td width="119px" height="50px" class="littletittle" >V-EEG印象</td>
                    <td contentEditable="true" width="363px" height="50px" class="littleinput"></td>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "paper"
    }
</script>

<style scoped>
.tittle{
    text-align: center;
    font-size: 18px;
    font-weight: 600;
}

.flex-container {
    display: flex;
    justify-content: space-between;
}
    .littletittle{
        background-color: #F7F8FB;
        border:1px solid lightgray;
        border-top:0
    }
.littleinput{
    border:1px solid lightgray;
    border-top:0
}
</style>
<template>
    <div id="heatmap" style="width: 400px;height: 350px">
        <div>
            <img src="../assets/down.png" alt="" style="z-index: 10">
            <img src="../assets/up.png" alt="" style="z-index: 999;position:absolute;left: 0">
        </div>
    </div>
</template>

<script>
    import Heatmap from 'heatmap.js'
    export default {
        name: "test2",
        data () {
            return {
                value1:55,
                value2:45,
                value3:35,
                value4:25,
                value5:15,
                value6:5,
                value7:15,
                value8:25,
                value9:35,
                value10:45,
                value11:79,
                value12:45,
                value13:35,
                value14:25,
                value15:15,
                value16:5,
            }
        },
        mounted() {
            let me=this
            var heatmapInstance = Heatmap.create({
                container: document.getElementById('heatmap'),
                radius: 60,
                gradient: {
                    // enter n keys between 0 and 1 here
                    // for gradient color customization
                    '.2': '#FFB6C1',
                    '.40': '#FF1493',
                    '.70': '#DC143C'
                }
            })
            var kvArray = [
                {x: 140, y: 50,value:this.value1},
                {x: 250, y: 50,value:this.value2},
                {x: 130, y: 180,value:this.value3},
                {x: 260, y: 180,value:this.value4},
                {x: 80, y: 250,value:this.value5},
                {x: 310, y: 250,value:this.value6},
                {x: 140, y: 305,value:this.value7},
                {x: 250, y: 305,value:this.value8},
                {x: 78, y: 105,value:this.value9},
                {x: 318, y: 105,value:this.value10},
                {x: 150, y: 137,value:this.value11},
                {x: 242, y: 137,value:this.value12},
                {x: 67, y: 180,value:this.value13},
                {x: 330, y: 180,value:this.value14},
                {x: 155, y: 235,value:this.value15},
                {x: 245, y: 235,value:this.value16},
            ];
            var data = {
                max: 50,
                min: 0,
                data: kvArray
            }


            setInterval(
                function () {
                    for(var i=0;i<16;i++)
                        data.data[i].value=Math.random()*50
                    heatmapInstance.setData(data)
                }
                ,1000)
        }
    }
</script>

<style scoped>

</style>
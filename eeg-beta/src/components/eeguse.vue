<template>
    <div id="app">
        <div id="container"></div>
        <div class="operation">
            <input type="number" value="100" v-model="yRange" />
            <button @click="setYRange()">设置振幅</button>&nbsp;&nbsp;
            <button @click="zoom()">缩放（当前范围 {{xRange}}s）</button>
            <p>
                <button @click="stop()">停止</button>
                <button @click="start()">开始</button>
            </p>

            <p>
                <button @click="goto(true)">后退</button>
                <button @click="goto()">前进</button>
            </p>
        </div>
    </div>
</template>

<script>
    import GlobalMsg from '../global_msg.js'
    import eventBus from "../utils/eventBus";
    import Diagram from "../module/Diagram";
    import axios from "axios";

    export default {
        name: "app",
        data: function() {
            return {
                yRange: 200, // 振幅
                xRange: 10, // x 轴显示范围，默认是 10 s
                diagram: null,
                dataUrls: ["data.json", "data2.json"],
                rconfig:{
                    method:'post',
                    url: 'http://'+GlobalMsg.ip+':8080/user/getEEG',
                    data:"&patientId="+"BH20191207004"+'&order='+1+'&num='+1,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
            };
        },
        mounted: function() {
            let me=this
            this.createChart();
            eventBus.$on('zoom',(arg)=>{
                me.yRange=arg
                me.setYRange()
            })
            eventBus.$on('starteeg',(arg)=>{
                me.start()
            })
            eventBus.$on('endeeg',(arg)=>{
                me.stop()
            })
            eventBus.$on('left',(arg)=>{
                me.goto(true)
            })
            eventBus.$on('right',(arg)=>{
                me.goto()
            })


        },
        methods: {
            goto(isPre) {
                this.diagram.goto(isPre);
            },
            stop() {
                this.diagram.stop();
            },
            start() {
                this.diagram.start();
            },
            zoom() {
                this.xRange = this.xRange === 10 ? 5 : 10;
                this.diagram.update(this.xRange);
            },

            setYRange() {
                this.diagram.update(undefined, this.yRange);
            },

            dataProvider(params, callback) {
                var order = params.order,
                    num = params.num;

                console.log('get ', order, num);
                // let i = 0,
                //   j = 16,
                //   k = 0,
                //   count = num * 5000,
                //   data = [];

                // for(; i < j; i++) {
                //   data.push([])
                //   for(k = 0; k < count; k++) {
                //     data[i].push(Math.random() * 10)
                //   }
                // };
                // callback(data);

                // console.log("get-data-range", order, num);
                axios
                    .get(this.dataUrls[(order - num) % 2 === 0 ? 0 : 1])
                    .then(function(response) {
                        callback(response.data);
                    });
            },

            createChart() {

                // 初始化图表，默认是绘制一条直线（值为 0）
                this.diagram = new Diagram("container", null, this.dataProvider);
                window.diagram = this.diagram;

            }
        }
    };
</script>

<style>
    #container {
        width: 1080px;
        height: 750px;
        background-color: #eee;
    }

    .operation {
        position: fixed;
        left: 1200px;
        top: 30px;
    }
</style>

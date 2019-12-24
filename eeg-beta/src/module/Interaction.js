class Interaction {
   constructor(diagram) {
      this.diagram = diagram;
      this.data = null;
      this.nextData = null;

      this.dataParams = {
         order: 1,
         num: 1
      };

      this.init();
   }

   perparData() {
      this.dataParams.order += this.dataParams.num;
      this.loadData(data => {
         this.nextData = data;
      });
   }

   switchData() {
      this.data = null;
      this.data = this.nextData;
      this.nextData = null;
      this.perparData();
   }

   loadData(callback) {
      this.diagram.dataProvider(this.dataParams, data => {
         callback(data);
      });
   }

   init() {
      this.timer = null;
      this.interval = this.diagram.options.chart.interval; // 刷新间隔
      this.updateDataCount = this.diagram.options.chart.seriesPointCount / (1000 / this.interval); // 每次刷新点的数量 

      this.x = 0; // 光标位置
      this.xInterval = this.interval / 1000; // 光标步进
      this.dataIndex = 0; // 
      this.pointCount = this.diagram.seriesPointCount;

      this.loadData(data => {
         this.data = data;
         this.start();
         this.perparData();
      });
   }

   update(reset) {
      this.x += this.xInterval;
      let points = [];

      if (reset) {
         this.data.forEach((data, j) => {
            points.push([]);
            for (let i = 0; i < this.dataIndex; i++) {
               points[j].push(data[i]);
            }
         });
      } else {
         this.data.forEach((data, j) => {
            points.push([]);
            for (let i = this.dataIndex; i < this.dataIndex + this.updateDataCount; i++) {
               points[j].push(data[i]);
            }
         });
      }
      this.diagram.updateData(points, this.dataIndex);
      this.dataIndex += this.updateDataCount;

      this.diagram.updateCursor(this.x);
      if (this.dataIndex >= this.pointCount) {
         this.diagram.updateXAxis(this.dataParams.order * 10, (this.dataParams.order + this.dataParams.num) * 10);
         this.switchData();
         this.dataIndex = 0;
         this.x = 0;
      }
   }

   start() {
      if (this.timer) {
         return false;
      }
      this.timer = setInterval(() => {
         this.update();
      }, this.interval);
   }

   stop() {
      if (this.timer) {
         clearInterval(this.timer);
         this.timer = null;
      }
   }

   setDataOrder(order) {
      this.dataParams.order = order;
      this.loadData(data => {
         this.data = data;
         this.diagram.updateXAxis(this.dataParams.order * 10, (this.dataParams.order + this.dataParams.num) * 10);
         this.diagram.updateCursor(0);
         this.diagram.series.forEach((series, i) => {
            console.log(this.data[i].length, this.pointCount);
            series.zoom(this.data[i], this.pointCount);
         });
         this.x = 0;
         this.dataIndex = 0;
      });
   }

   zoom(xRange) {
      let isZoomIn = false;
      this.dataParams.order -= 1;
      if (xRange === 5) {
         this.dataParams.num = 0.5;
         isZoomIn = true;
      } else {
         this.dataParams.num = 1;
      }
      this.updateDataCount = this.diagram.options.chart.seriesPointCount / (1000 / this.interval);
      this.pointCount = this.diagram.seriesPointCount;

      if (this.isZoomIn && this.dataIndex >= this.pointCount) {
         this.dataIndex = 0;
      }


      this.loadData(data => {
         this.data = data;
         this.diagram.updateCursor(this.x);
         this.diagram.series.forEach((series, i) => {
            series.zoom(this.data[i], this.dataIndex);
         });
         this.start();
         this.perparData();
      });
   }
}
export default Interaction;
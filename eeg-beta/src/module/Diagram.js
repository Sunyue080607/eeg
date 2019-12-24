import Highcharts from 'highcharts';
import Axis from './Axis';
import Series from './Series';
import HCRenderer from 'zrender';
import defaultOptions from './defaultOptions';
import Interaction from './Interaction';



class Diagram {
   constructor(el, options, dataProvider) {
      this.el = typeof el === 'string' ? document.getElementById(el) : el;
      if (!this.el || !this.el.style) {
         console.error('error #1');
         return false;
      }

      this.options = Highcharts.merge({
         colors: Highcharts.getOptions().colors,
         xAxis: {
            min: 0,
            max: 10
         },
         yAxis: {
            range: 200,
            categroies: (() => {
               let result = [];
               for (let i = 0; i < 16; i++) {
                  result.push('Fp' + (i + 1));
               }
               return result;
            })()
         },
         chart: {
            margin: [10, 20, 20, 10],
            seriesPointCount: 500,
            interval: 200
         }
      }, options);

      this.dataOptions = {
         order: 1,
         num: 1
      };

      this.dataProvider = dataProvider;


      this.calcSize();

      this.renderer = HCRenderer.init(this.el);
      this.init();
   }

   /**
    * @private
    */
   calcSize() {
      var margin = this.options.chart.margin;
      this.size = {
         width: this.el.clientWidth,
         height: this.el.clientHeight,
         plotLeft: 50 + margin[3],
         plotTop: 30 + margin[0],
      };
      this.size.plotWidth = this.size.width - this.size.plotLeft - margin[1];
      this.size.plotHeight = this.size.height - this.size.plotTop - margin[2];
      this.size.seriesHeight = this.size.plotHeight / this.options.yAxis.categroies.length;
   }

   updateXAxis(start, end) {
      // console.log('x-range', start, end)
      this.xAxis.updateTicks(start, end);
   }


   updateCursor(x) {
      this.cursor.attr({
         shape: this.calcCursorAttr(x)
      });
   }

   /**
    * @private
    * @param {@} x 
    */
   calcCursorAttr(x) {
      var position = this.xAxis.toPixels(x);
      return {
         x1: position,
         y1: this.size.plotTop,
         x2: position,
         y2: this.size.plotTop + this.size.plotHeight
      }
   }

   init() {
      this.plotRect = new HCRenderer.Rect({
         silent: true,
         shape: {
            x: this.size.plotLeft,
            y: this.size.plotTop,
            width: this.size.plotWidth,
            height: this.size.plotHeight
         },
         style: {
            fill: '#fff',
         },
         z: 0
      });

      this.renderer.add(this.plotRect);

      this.loading = new HCRenderer.Text({
         silent: true,
         style: {
            text: 'Loading...',
            fontSize: '18',
            fontWeight: 'bold',
            textFill: 'red'
         },
         position: [this.size.plotLeft + this.size.plotWidth / 2, this.size.plotTop + this.size.plotHeight / 2],
         z: defaultOptions.zIndex.loading
      });

      this.renderer.add(this.loading);


      this.initAxies();

      this.cursor = new HCRenderer.Line({
         silent: true,
         shape: this.calcCursorAttr(0),
         style: {
            stroke: '#fff',
            lineWidth: 2
         },
         z: defaultOptions.zIndex.cursor
      });

      this.renderer.add(this.cursor);

      setTimeout(() => {
         this.firstRender();
         this.loading.attr({
            style: {
               opacity: 0
            }
         });


         // this.interaction = new Interaction(this);
         // this.startTimer();
      }, 50);
   }
   startInteraction(){
      this.interaction = new Interaction(this);
   }


   initAxies() {
      // xAxis
      this.xAxis = new Axis(this, true, this.options.xAxis);
      // yAxis
      this.yAxis = new Axis(this, false, this.options.yAxis);

   }



   firstRender() {
      this.series = [];

      let i = 0,
         j = 0,
         pointCount = this.options.chart.seriesPointCount * (this.xAxis.max - this.xAxis.min),
         series = null;

      this.seriesPointCount = pointCount;

      this.seriesGroup = new HCRenderer.Group();
      this.renderer.add(this.seriesGroup);


      for (i = 0; i < this.yAxis.max; i++) {
         series = {
            yAxis: i,
            color: '#aaa', //this.options.colors[i % this.options.colors.length],
            data: []
         };
         for (j = 0; j < pointCount; j++) {
            series.data.push(0);
         }
         this.series.push(new Series(this, series));
      }
   }


   updateData(data, startPosition) {
      if (data.length !== this.series.length) {
         console.error('Error#3')
         return false;
      }

      this.series.forEach((series, i) => {
         series.update(data[i], startPosition);
      });
   }


   /**
    * 高亮指定通道指定范围内的数据
    * 当只有 yIndex 参数时，表示取消对应通道高亮
    * 
    * @public
    * @param {int} yIndex 通道编号，下标从 0 开始
    * @param {number} from 高亮范围起始值（x 值， 0 ~ 10）
    * @param {number} to 高亮范围结束值（x 值，0 ~ 10
    * @param {string} color 颜色
    */
   highlight(yIndex, from, to, color) {
      if (yIndex < 0 || yIndex >= this.series.length) {
         console.error('Error#4');
         return false;
      }

      let series = yIndex === undefined ? this.series : [this.series[yIndex]];
      series.forEach(serie => {
         serie.highlight(from, to, color);
      });
   }

   update(xRange, yRange) {
      if (xRange === undefined && yRange === undefined) {
         return false;
      }

      if (xRange === undefined && yRange === this.yAxis.range) {
         return false;
      }

      this.loading.attr({
         style: {
            opacity: 1
         }
      });

      if (xRange !== undefined) {
         this.stop();
         this.xAxis.setRange(xRange);
         this.seriesPointCount = this.options.chart.seriesPointCount * (this.xAxis.max - this.xAxis.min);
      }

      if (yRange !== undefined) {
         this.yAxis.setRange(yRange);
      }

      this.interaction.zoom(this.xAxis.range);

      this.loading.attr({
         style: {
            opacity: 0
         }
      })
   }

   stop() {
      this.interaction.stop();
   }

   start() {
      this.interaction.start();
   }

   goto(isPre) {
      if(this.interaction.timer) {
         console.error('Error#6');
         return false;
      }
      
      let order = this.interaction.dataParams.order + (isPre ? -1 : 1);
      if(order < 1) {
         console.error('Error#7');
         return false;
      }
      this.interaction.setDataOrder(order);
   }
}

export default Diagram;
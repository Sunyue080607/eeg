import Highcharts from 'highcharts';
import defaultOptions from './defaultOptions';
import HCRenderer from 'zrender';

let defaultLabelFormat = function (tick) {
   return tick.cate || tick.value;
}

class Axis {
   constructor(chart, isXAxis, options) {
      this.chart = chart;
      this.isX = isXAxis;
      this.options = Highcharts.extend(defaultOptions[this.isX ? 'xAxis' : 'yAxis'], options);
      this.type = this.options.type || 'category';
      this.isCategory = this.type === 'category';
      // 坐标轴范围，对于 X 轴，表示最大值和最小值差，默认是 10， 缩放后是 5
      // 对于 y 轴，表示振幅的一般，比如 100 表示 -100 ~ 100
      this.range = this.options.range; 

      this.min = null;
      this.max = null;

      this.tickInterval = null;
      this.tickWidth = null;

      this.z = defaultOptions.zIndex.axis;
      this.init();
   }



   toPixels(value) {
      return this.isX ?
         (this.chart.size.plotLeft + (value / this.max) * this.chart.size.plotWidth) :
         (this.chart.size.plotTop + (value / this.max) * this.chart.size.plotHeight)
   }

   setRange(range) {
      if (this.isX) {
         this.min = 0;
         this.max = range;
         this.range = range;
         // console.log(this.dataMin, this.dataMax);
         this.dataMax = this.dataMin + range;
         // console.log(this.dataMin, this.dataMax);

         this.renderTicks();
      } else {
         this.range = range;
      }
   }

   renderTicks() {
      if (this.ticks) {
         this.ticks.forEach(tick => {
            this.group.remove(tick.gridLine);
            if (tick.label) {
               this.group.remove(tick.label)
            }
            tick = null;
         });
      }

      this.ticks = [];

      let tick = null,
         hasMinor = this.options.minorGridLineWidth && this.options.minorTickInterval,
         counter = 0;

      for (let i = this.min; i <= this.max; i += this.tickInterval) {
         tick = {
            isFirst: i === this.min,
            isLast: i === this.max,
            value: this.dataMin + counter * this.tickInterval,
            position: this.toPixels(i),
            cate: this.isCategory ? this.options.categroies[i] : null
         };

         
         this.renderTick(tick);
         this.ticks.push(tick);

         if (hasMinor) {
            for (let j = i + this.options.minorTickInterval; j < i + this.tickInterval; j += this.options.minorTickInterval) {
               tick = {
                  isMinor: true,
                  value: j,
                  position: this.toPixels(j)
               }
               this.renderTick(tick);
               this.ticks.push(tick);
            }
         }

         counter++

         

      }
   }

   renderTick(tick) {
      var position = tick.position,
         halfTickWidth = this.tickWidth / 2,
         labelPosition = null,
         labelAttr = null,
         tickLineAttr = null;

      if (tick.isMinor || this.options.gridLine) {
         if (!tick.isMinor) {
            tickLineAttr = {
               stroke: this.options.gridLineColor || '#ccc',
               lineWidth: this.options.gridLine
            };
         } else {
            tickLineAttr = {
               stroke: this.options.minorGridLineColor || '#ccc',
               lineWidth: this.options.minorGridLineWidth || 1,
               lineDash: [2, 2]
            }
         }
         tick.gridLine = new HCRenderer.Line({
            shape: this.isX ? {
               x1: position,
               y1: this.chart.size.plotTop,
               x2: position,
               y2: this.chart.size.plotTop + this.chart.size.plotHeight
            } : {
               x1: this.chart.size.plotLeft,
               y1: position,
               x2: this.chart.size.plotLeft + this.chart.size.plotWidth,
               y2: position
            },
            z: this.z,
            silent: true,
            style: tickLineAttr
         })
         this.group.add(tick.gridLine);
      }

      if (tick.isMinor || (this.isCategory && tick.isLast)) {
         return false;
      }

      labelAttr = {
         text: (this.options.labels.format || defaultLabelFormat).call(this, tick)
      };

      if (this.isX) {
         labelPosition = [position, this.chart.size.plotTop - this.options.labels.padding];
         labelAttr.textVerticalAlign = 'bottom';
         labelAttr.textAlign = (!this.isCategory && tick.isLast) ? 'right' : 'center';
      } else {
         labelPosition = [this.chart.size.plotLeft - this.options.labels.padding, position + halfTickWidth];
         labelAttr.textVerticalAlign = 'middle';
         labelAttr.textAlign = 'right';
      }

      tick.label = new HCRenderer.Text({
         silent: true,
         style: labelAttr,
         position: labelPosition,
         z: this.z
      });

      this.group.add(tick.label);
   }

   init() {

      this.group = new HCRenderer.Group();
      this.chart.renderer.add(this.group);

      if (this.isCategory) {
         this.min = 0;
         this.max = this.options.categroies.length;
         this.tickInterval = 1;
      } else {
         this.min = this.options.min;
         this.max = this.options.max;
         this.tickInterval = this.options.tickInterval;
      }
      this.dataMin = this.min;

      this.dataMax = this.max;

      if (this.isX) {
         this.range = this.max - this.min;
         this.tickWidth = this.chart.size.plotWidth / this.range;
      } else {
         this.tickWidth = this.chart.size.plotHeight / (this.max - this.min);
      }

      this.renderTicks();


   }

   updateTicks(start, end) {
      this.dataMin = start;
      this.dataMax = end;
      let counter = 0;
      this.ticks.forEach(tick => {
         tick.value = this.dataMin + counter * this.tickInterval;
         if (!tick.isMinor) {
            tick.label.attr({
               style: {
                  text: (this.options.labels.format || defaultLabelFormat).call(this, tick)
               }
            });
            counter++;
         }

      });
   }
};

export default Axis;
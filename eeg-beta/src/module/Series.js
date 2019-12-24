import defaultOptions from './defaultOptions';
import HCRenderer from 'zrender';

class Series {
   constructor(chart, options) {
      this.chart = chart;
      this.options = options;
      this.yAxis = this.options.yAxis;
      this.z = defaultOptions.zIndex.series;
      this.highlightObj = null;
      this.init();
   }

   highlight(from, to, color) {
      if (from === undefined) { // remove
         if (this.highlightObj) {
            this.chart.seriesGroup.remove(this.highlightObj.line);
            this.highlightObj = null;
         }
      } else { // add or update
         if (!to) {
            console.error('#5');
            return false;
         }
         if (!this.highlightObj) {
            this.highlightObj = {};
            this.highlightObj.color = color || defaultOptions.highlightColor;
         } else if (color) {
            this.highlightObj.color = color;
         }
         let rate = this.chart.options.chart.seriesPointCount;
         this.highlightObj.from = from * rate;
         this.highlightObj.to = to * rate;
         this.renderHighlight();
      }
   }

   inHighlight(start, end) {
      if (!this.highlightObj) {
         return false;
      }
      if (end < this.highlightObj.from || start > this.highlightObj.to) {
         return false;
      }
      return true;
   }

   renderHighlight() {
      if (!this.highlightObj) {
         return false;
      }
      let highlightPoins = [];
      this.points.forEach(p => {
         if (p.x >= this.highlightObj.from && p.x <= this.highlightObj.to) {
            highlightPoins.push([p.plotX, p.plotY])
         }
      });
      if (this.highlightObj.line) {
         this.highlightObj.line.attr({
            shape: {
               points: highlightPoins
            }
         })
      } else {
         this.highlightObj.line = new HCRenderer.Polyline({
            shape: {
               points: highlightPoins
            },
            style: {
               stroke: this.highlightObj.color,
               lineWidth: 1
            },
            z: this.z + 1
         });
         this.chart.seriesGroup.add(this.highlightObj.line);
      }

   }

   zoom(data, endX) {
      for(let i = 0; i < endX; i ++) {
         this.options.data[i] = data[i]
      }
      this.init();
   }

   init() {
      this.points = [];
      this.xOffset = this.chart.size.plotLeft;
      this.xPixes = this.chart.size.plotWidth / this.chart.seriesPointCount;
      this.yOffset = this.chart.size.plotTop + this.yAxis * this.chart.yAxis.tickWidth;
      this.yPixes = this.chart.yAxis.tickWidth / (this.chart.yAxis.range * 2) // 

      var point = null;
      this.linePoints = [];
      if(this.options.data.length > this.chart.seriesPointCount) {
         this.options.data.length = this.chart.seriesPointCount;
      } else  if(this.options.data.length < this.chart.seriesPointCount) {
         let counter = this.chart.seriesPointCount - this.options.data.length;
         while(counter) {
            this.options.data.push(0);
            counter --;
         }

      }
      this.options.data.forEach((y, index) => {
         point = this.renderPoint(index, y);
         this.points.push(point);
         this.linePoints.push([point.plotX, point.plotY])
      });
      if (this.line) {
         this.line.attr({
            shape: {
               points: this.linePoints
            }
         });
         this.renderHighlight();
      } else {
         this.line = new HCRenderer.Polyline({
            shape: {
               points: this.linePoints
            },
            style: {
               stroke: '#aaa',
               lineWidth: 1
            },
            z: this.z
         });

         this.line.setClipPath(this.chart.plotRect);

         this.chart.seriesGroup.add(this.line);
      }
   }

   translatePoint(point) {
      point.plotX = this.xOffset + point.x * this.xPixes;
      point.plotY =
         /**
          *   100       0
          * 
          * 
          *     0       100     => y = range - x
          * 
          *  
          *   -100      200 
          */
         this.yOffset + (this.chart.yAxis.range - point.y) * this.yPixes
   }


   renderPoint(x, y) {
      let point = {
         x: x,
         y: y
      };
      this.translatePoint(point);

      // point.cicle = new HCRenderer.Circle({
      //    shape: {
      //       cx: point.plotX,
      //       cy: point.plotY,
      //       r: 0.5
      //       // width: 0.5,
      //       // height: 0.5
      //    },
      //    style: {
      //       fill: this.options.color
      //    }
      // });

      // this.chart.renderer.add(point.cicle);

      return point;
   }

   update(data, startPosition) {
      let counter = 0;
      for (let i = startPosition; i < startPosition + data.length; i++) {
         // this.points[i].y = data[i];
         // this.points[i].y = data[counter];
         this.options.data[i] = data[counter];
         this.points[i] = this.renderPoint(this.points[i].x, data[counter]);
         this.linePoints[i] = [this.points[i].plotX, this.points[i].plotY]
         counter++;
      }
      this.line.attr({
         shape: {
            points: this.linePoints
         }
      });

      let needUpdate = this.inHighlight(startPosition, startPosition + data.length);
      if (needUpdate) {
         this.renderHighlight();
      }
   }

   redraw() {
      this.init();
   }
}

export default Series;
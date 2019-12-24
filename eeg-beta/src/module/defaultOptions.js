export default {
   highlightColor: 'red',
   xAxis: {
      type: 'time',
      gridLine: 1,
      gridLineColor: '#ccc',
      tickInterval: 1,
      minorTickInterval: 0.2,
      minorGridLineColor: '#ccc',
      minorGridLineDashStyle: 'dash',
      minorGridLineWidth: 1,
      labels: {
         format: function (tick) {
            let hours = Math.floor((tick.value / 3600)),
               minute = Math.floor((tick.value - 3600 * hours) / 60),
               second = tick.value - 3600 * hours - minute * 60;
            return (hours > 9 ? hours : '0' + hours) + ':' + (minute > 9 ? minute : '0' + minute) + ':' + (second > 9 ? second : '0' + second);
         },
         padding: 8
      }
   },
   yAxis: {
      gridLine: 0,
      labels: {
         padding: 10
      }
   },

   zIndex: {
      axis: 1,
      series: 2,
      plotbox: 0,
      loading: 10,
      cursor: 9
   }
}
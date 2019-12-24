import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import Print from 'vue-print-nb'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';
import store from '../src/vuex/store'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueQuillEditor)
Vue.use(VueCookies)
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
Vue.use(Print);
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios=axios;


axios.interceptors.request.use(function (config) {
  // Do something before request is sent\
  config.headers.post['Content-Type'] = "application/json";

  if(localStorage.getItem("token") && localStorage.getItem("tokenHead")){
    config.headers['Authorization'] = localStorage.getItem("tokenHead")+localStorage.getItem("token")
    // config.headers.header['Authorization'] = localStorage.getItem("tokenHead")+localStorage.getItem("token")
  }

  return config;
  //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
//
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
//
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')


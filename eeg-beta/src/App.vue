<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
  import GlobalMsg from './global_msg'

  export default{

    name: 'app',
    destroyed() {
      let rconfig={
          method:'post',
          url: 'http://'+GlobalMsg.ip+':8080/time/tadayUseTime',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      };

      this.$axios(rconfig)
          .then((response) => {
          }).catch((error) => {
          console.log(error);
      });
    }


  }
</script>

<style>
  @import "./assets/main.css";
</style>

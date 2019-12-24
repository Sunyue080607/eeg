<template>
   <div>
       <logn-part></logn-part>
       <head-navigation class="headNav"></head-navigation>
       <eeg/>
       <video-part class="videoPart"></video-part>
       <execption-record class="record"></execption-record>
       <button-bottom class="button_bottom"></button-bottom>
   </div>
</template>

<script>
    import lognPart from '../components/logn-background'
    import headNavigation from '../components/head-navigation'
    import execptionRecord from '../components/execptionrecord'
    import eeg from '../components/eegnew'
    import videoPart from '../components/videopart'
    import buttonBottom from '../components/button-bottom'

    export default {
        components:{
            headNavigation,
            execptionRecord,
            videoPart,
            lognPart,
            buttonBottom,
            eeg
        }
    }

</script>

<style scoped>
    /*.videoPart{*/
    /*    position: absolute;*/
    /*    top:18%;*/
    /*    left:74%;*/
    /*}*/
    /*.record{*/
    /*    position: absolute;*/
    /*    top:52%;*/
    /*    left: 74%;*/
    /*}*/
    /*.button_bottom{*/
    /*    position: absolute;*/
    /*    top:94%;*/
    /*    left:74%*/
    /*}*/
</style>
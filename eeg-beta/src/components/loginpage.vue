<template>
    <div class="homeBox">
        <div style="margin-left: 685px;margin-top: 50px">
            <login/>
        </div>

    </div>
    
</template>

<script>
    import login from "../components/login"

    export default {
        name: "login page",
        components:{
            login
        },
    }
</script>

<style scoped>
    .homeBox {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        background-image: url("../assets/loginback.png");
    }
</style>
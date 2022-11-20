<template>
    <div class="container-preloader">
        <div class="animsition-loading-1">
            <div class="preloader"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VzlacargoLoaderComponent',
};
</script>

<style>
.container-preloader {
    /*position: relative;*/
    width: 100%;
    height: 100%;
    visibility: visible;
    -webkit-transition: all .4s;
    -o-transition: all .4s;
    -moz-transition: all .4s;
    transition: all .4s;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.container-preloader.hidden{
    animation-duration: 1500ms;
    opacity: 0;
    visibility: hidden;
}

.animsition-loading-1 {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.preloader {
    width: 56px;
    height: 56px;
    border: 4px solid #24298D;
    border-radius: 50%;
    position: relative;
    animation: loader-scale 1s ease-out infinite;
    top: 50%;
    margin: -28px auto 0 auto;
}

@keyframes loader-scale {
  0% {
    transform: scale(0);
    opacity: 0; }
  50% {
    opacity: 1; }
  100% {
    transform: scale(1);
    opacity: 0; } 
}
</style>
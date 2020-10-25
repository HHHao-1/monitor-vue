<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    #app {
        .btn.active, .btn:active {
            -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
            box-shadow: inset 0 0 0 rgba(0, 0, 0, 0);
        }
    }
</style>

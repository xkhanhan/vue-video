<template>
    <div class="list-content">
        <div class="list-item" v-for="(item, index) in data" :key="index">
            {{ item }}
        </div>
    </div>
</template>

<script>
export default {
    name : "xkList",
    props : {
        data : {
            type : Array,
            default  () {
                return []
            }
        }
    },

}
</script>

<style scoped>

</style>
<template>
    <div style="padding:10px" :class="{'clickable':clickable}">
        <img :width="radius" :height="radius" :src="logoPath" alt="">
    </div>
</template>
<script>
export default {
    name: 'imgThumb',
    props: {
        imagePath: {
            type: String,
            false: true,
        },
        radius: {
            type: Number,
            default: 80
        },
        clickable: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        logoPath(){
            if(this.imagePath)
                return `http://localhost:3000/${this.imagePath}`;
            return '';
        }
    }
}
</script>
<style lang="sass">
// .img-thumb
    // border: 1px solid #e8e8e8
</style>
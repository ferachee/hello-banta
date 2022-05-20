<template>
    <div class="img-thumb uk-width-small uk-height-small uk-flex uk-flex-middle uk-flex-center">
        <h1 class="uk-heading-small uk-margin-remove">
            {{title}}
        </h1>
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
        title: {
            type: String,
            default: '',
        },
    }
}
</script>
<style lang="sass">
// .img-thumb
    // border: 1px solid #e8e8e8
</style>
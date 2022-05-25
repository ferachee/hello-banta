<template>
    <div class='uk-flex uk-flex-center uk-height-large uk-flex-middle'>
        <div :uk-spinner="spinnerSize"></div>
    </div>
</template>

<script>
export default {
    name: 'LoaderComponent',
    props: {
        size: {
            type: Number,
            default: 5,
        },
    },
    computed: {
        spinnerSize() {
            return `ratio: ${this.size}`;
        },
    },
};
</script>

<style>
</style>

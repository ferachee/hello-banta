<template>
    <div class="team-thumb uk-text-center" style="padding: 10px">
        <div>
            <img :width="radius" :height="radius" :src="path" alt="">
        </div>
        <p class="uk-margin-remove uk-text-small">
            <!-- {{name}} -->
        </p>
    </div>
</template>
<script>
export default {
    name: 'TeamThumb',
    props: ['imagePath', 'name'],
    data() {
        return {
            radius: 25,
        }
    },
    computed: {
        path() {
            return `http://localhost:3000/${this.imagePath}`;
        }     
    },
    
}
</script>
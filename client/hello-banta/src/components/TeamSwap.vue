<template>
    <div id="teamScroller" class="uk-text-center">
        <div>
            <span uk-icon="icon: triangle-up" class="clickable" @click="toggle" v-show="toggleKey"></span>
        </div>
        <div class="scroll-mask">
            <div class="scroll-pane" :class="{'going-up': toggleKey, 'going-down': toggleKey === false}">
                <TeamThumb v-for="team in teams" :key="team.slug"
                           :imagePath="team.logo" :name="team.name" class="clickable">
                </TeamThumb>
            </div>
        </div>
        <div>
            <span uk-icon="icon: triangle-down" @click="toggle" class="clickable" v-show="!toggleKey"></span>
        </div>
    </div>
</template>
<script>
import TeamThumb from './TeamThumb.vue';
export default {
    name: 'teamScroller',
    props:['teams'],
    components: {
        TeamThumb,
    },
    data() {
        return {
            length: 10,
            toggleKey: null,
            direction: 0,
        }
    },
    computed: {

    },
    methods: {
        toggle() {
            if (this.toggleKey === null) {
                this.toggleKey = true;
            }
            else {
                this.toggleKey = !this.toggleKey;
            }
        }
    }
}
</script>
<style lang="sass">
$dist: 465px
#teamScroller
    .scroll-mask
        height: $dist
        overflow: hidden
        .scroll-pane
            position: relative
    .going-up
        animation: up 0.3s ease-in-out
        top: -$dist

    .going-down
        animation: down 0.3s ease-in-out
        top: 0px
    
    @keyframes up 
        0%
           top: 0px
        100%
           top: -$dist

    @keyframes down 
        0%
           top: -$dist
        100%
           top: 0px

</style>

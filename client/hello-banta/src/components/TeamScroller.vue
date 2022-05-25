<template>
    <div id="teamScroller" class="uk-text-center">
        <div>
            <button>up</button>
        </div>
        <div>
            <TransitionGroup name="teamlist">
                <TeamThumb v-for="team in teamList" :key="team.slug"
                           :imagePath="team.logo" :name="team.name" >
                </TeamThumb>
            </TransitionGroup>
        </div>
        <div>
            <button @click="scrollDown">down</button>
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
            teamList: this.teams.slice(0,10),
            cursor: 0,
            direction: 0,
        }
    },
    computed: {

    },
    methods: {
        scrollDown() {
            this.teamList.push(this.teams[ this.cursor + this.length]);
            this.teamList.splice(0, 1);
            this.cursor += 1
        }
    }
}
</script>
<style lang="sass">
#teamScroller
    .teamlist-move
    .teamlist-enter-active,
    .teamlist-leave-active
        transition: all 0.5s ease
    .teamlist-leave-to
        opacity: 0
        transform: translateY(-30px)
    .teamlist-enter-from
        opacity: 0
        transform: translateY(30px)
    .teamlist-leave-active
        position: absolute
</style>
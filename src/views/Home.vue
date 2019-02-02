<template>
    <div class="mt-5">
        <div class="row">
            <div class="col-4">
                <parking-spot class="mb-3" v-for="spot in spotsList.items" v-bind:key="spot.id" :data="spot"></parking-spot>
            </div>
            <div class="col">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import ParkingSpot from '@/components/ParkingSpot.vue'

    export default {
        name: 'home',
        props: {

        },
        components: {
            ParkingSpot
        },
        apollo: {
            spotsList: {
                query: gql`query AllSpots {
                  spotsList {
                    items {
                      address {
                        street1
                        street2
                        city
                        state
                        zip
                      }
                      price
                      id
                      users {
                        firstName
                        lastName
                        email
                      }
                    }
                  }
                }`
            }
        },
        data() {
            return {
                spotsList: []
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">

</style>

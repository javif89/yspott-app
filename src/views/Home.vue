<template>
    <div class="mt-5">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add-spot-modal">
            New Spot
        </button>
        <div class="row">
            <div class="col-4">
                <parking-spot class="mb-3" v-for="spot in spotsList.items" v-bind:key="spot.id" :data="spot"></parking-spot>
            </div>
            <div class="col">
                <router-view></router-view>
            </div>
        </div>
        <create-spot-form @spotCreated="reloadSpots"></create-spot-form>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import ParkingSpot from '@/components/ParkingSpot.vue'
    import CreateSpotForm from '@/components/CreateSpotForm'

    export default {
        name: 'home',
        props: {

        },
        components: {
            ParkingSpot,
            CreateSpotForm
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
                      user {
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
            reloadSpots: function() {
                this.$apollo.queries.spotsList.refetch();
            }
        }
    }
</script>

<style lang="scss">

</style>

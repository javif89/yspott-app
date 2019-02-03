<template>
    <div class="mt-1">
        <div class="row">
            <div class="col-6">
                <label for="">City</label>
                <div class="form-inline">
                    <input type="text" v-model="cityToSearch" class="form-control">
                    <button class="btn btn-outline-dark" @click="search">Search</button>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#add-spot-modal">
            New Spot
        </button>
        <h2>Parking spots in: {{ cityToSearch }}</h2>
        <h2>Loc: {{ cityLoc }}</h2>
        <div class="row">
            <div class="col-4">
                <parking-spot class="mb-3" v-for="spot in spotsList.items" v-bind:key="spot.id" :data="spot"></parking-spot>
            </div>
            <div class="col">
                <!--<router-view></router-view>-->
                <GmapMap
                        :center="cityLoc"
                        :zoom="12"
                        map-type-id="terrain"
                        style="width: 100%; height: 700px"
                >
                    <GmapMarker
                            :key="index"
                            v-for="(spot, index) in spotsList.items"
                            :position="spot.position"
                            :clickable="true"
                            :draggable="true"
                            :label="'$'+spot.price.toString()"
                            @click="position=cityLoc"
                    />
                </GmapMap>
            </div>
        </div>
        <create-spot-form @spotCreated="reloadSpots"></create-spot-form>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import ParkingSpot from '@/components/ParkingSpot.vue'
    import CreateSpotForm from '@/components/CreateSpotForm'
    var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyC-dO2_RmFXUpvn7cH3N0ur7-om1NwVoQQ'
    });

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
                query: gql`query AllSpots($city:String!) {
                    spotsList(filter:{
                      address: {
                        city: {
                          contains:$city
                        }
                      }
                    }), {
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
                  }`,
                variables() {
                    return {
                        city: this.cityToSearch
                    }
                }
            }
        },
        data() {
            return {
                spotsList: [],
                cityToSearch: 'Miami',
                cityLoc: {lat: 20, lng: 20}
            }
        },
        created() {
            this.debounceSearch = _.debounce(this.search, 500)
        },
        watch: {
            cityToSearch: function (newCity, oldCity) {
                console.log(newCity)
                this.debounceSearch();
            }
        },
        methods: {
            reloadSpots: function() {
                this.$apollo.queries.spotsList.refetch();
            },
            search: function () {
                googleMapsClient.geocode({
                    address: this.cityToSearch
                }, function(err, response) {
                    if (!err) {
                        let location = response.json.results[0].geometry.location;
                        console.log(location);
                        this.cityLoc = location;
                    }
                }.bind(this));
                this.positionSpots();
            },
            positionSpots() {
                this.spotsList.items.forEach((spot) => {
                    let address = `${spot.address.street1}, ${spot.address.city}, ${spot.address.state}, ${spot.address.zip}`
                    console.log(address);
                    googleMapsClient.geocode({
                        address: address
                    }, function(err, response) {
                        if (!err) {
                            let location = response.json.results[0].geometry.location;
                            console.log(`Spot Location: ${spot.id}`);
                            console.log(location);
                            var picked = this.spotsList.items.findIndex(da_spot => da_spot.id === spot.id);
                            console.log(`picked ${picked}`)
                            this.spotsList.items[picked].position = location;
                            this.cityLoc = location;
                        }
                    }.bind(this));
                });
            }
        }
    }
</script>

<style lang="scss">

</style>

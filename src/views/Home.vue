<template>
    <div>
        <div class="search-container form-group row mt-1">
            <div class="col-10">
                <input type="text" v-model="cityToSearch" class="form-control" id="search-bar">
            </div>
            <div class="col-2">
                <button class="btn btn-outline-dark btn-lg btn-block" id="search-button" @click="search">Search</button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div v-if="spotsInArea">
                    <parking-spot class="mb-3" v-for="spot in spotsList.items" v-bind:key="spot.id" :data="spot"></parking-spot>
                </div>
                <div v-if="!spotsInArea">
                    <p class="lead text-muted">Sorry, there are no spots in this area :(</p>
                </div>
            </div>
            <div class="col">
                <div id="spot-details-container">
                    <router-view></router-view>
                </div>
                <GmapMap
                        :center="cityLoc"
                        :zoom="12"
                        map-type-id="terrain"
                        style="width: 100%; height: 900px"
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
                        picture {
                            downloadUrl
                        }
                        user {
                          firstName
                          lastName
                          email
                        }
                      }
                    }
                  }`,
                variables() {
                    let city = _.capitalize(_.toLower(this.cityToSearch));
                    return {
                        city: city
                    }
                }
            }
        },
        data() {
            return {
                spotsList: [],
                cityToSearch: 'miami',
                cityLoc: {lat: 25.758131, lng: -80.3031819}
            }
        },
        created() {
            this.debounceSearch = _.debounce(this.search, 500)
        },
        mounted() {
            if(this.$route.params.city) {
                this.cityToSearch = this.$route.params.city;
                this.search()
            }
        },
        watch: {
            cityToSearch: function (newCity, oldCity) {
                console.log(newCity)
                this.debounceSearch();
            },
            '$route' (to, from) {
                this.cityToSearch = this.$route.params.city;
            }
        },
        computed: {
            spotsInArea() {
                if(this.spotsList.items) {
                    return this.spotsList.items.length > 0;
                }
                else {
                    return false;
                }
            }
        },
        methods: {
            reloadSpots: function() {
                this.$apollo.queries.spotsList.refetch();
            },
            search: function () {
                let city = _.capitalize(_.toLower(this.cityToSearch));
                console.log(`City is: ${city}`)
                googleMapsClient.geocode({
                    address: city
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
                if(!this.spotsList.items)
                    return

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
    .search-container {

        .content {
            margin: auto;
            width: 50%;
        }

        #search-bar {
            font-size: 28px;
            border: none;
            font-weight: bold;
            border-bottom: 1px solid #333;
            border-radius: 0;
        }

        #search-button {
            font-size: 18px;
        }
    }

    #spot-details-container {
        position: absolute;
        max-width: 90%;
        background: rgba(255,255,255,0.95);
        z-index: 1051;
        top: 80px;
        left: 50px;
        padding: 20px;
    }
</style>

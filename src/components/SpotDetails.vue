<template>
    <div class="container-fluid" id="spot-details">
        <router-link :to="{name: 'home'}" class="close">&times;</router-link>
        <div class="row">
            <div class="col">
                <img v-if="spot.picture" :src="spot.picture.downloadUrl" alt="" class="img-fluid">
            </div>
            <div class="col">
                <div class="host-image" :style="{ backgroundImage: 'url(' + spot.user.avatar.downloadUrl + ')' }"></div>
                <h3 class="text-center mt-2">{{ spot.user.firstName }} {{ spot.user.lastName }}</h3>
            </div>
        </div>
        <hr>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Summary</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">More info</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Bookings</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="row mt-3">
                    <div class="col-4">
                        <h3>Address</h3>
                        <div class="parking-spot-address text-left">
                            <div class="street-line">{{ spot.address.street1 }}<span v-if="spot.address.street2">, {{ spot.address.street2 }}</span></div>
                            <div class="city-state">{{ spot.address.city }}, {{ spot.address.state }}</div>
                            <div class="zip">{{ spot.address.zip }}</div>
                        </div>
                    </div>
                    <div class="col">
                        <h4>Availability</h4>
                        <div class="row">
                            <div class="col">
                                <h5>From</h5>
                                <p class="lead">
                                    {{ spot.available_start | moment("h:mm:ss a") }}
                                </p>
                            </div>
                            <div class="col">
                                <h5>To</h5>
                                <p class="lead">
                                    {{ spot.available_end | moment("h:mm:ss a") }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <h4>Description</h4>
                        <p class="lead">
                            {{ spot.description }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <div class="row">
                    <div class="col d-flex flex-column justify-content-center">
                        <h4>Instant: <small>{{ spot.instant }}</small></h4>
                    </div>
                    <div class="col">
                        <h4>Rules</h4>
                        <p class="lead">
                            {{ spot.rules }}
                        </p>
                    </div>
                    <div class="col d-flex flex-column justify-content-center">
                        <h4>Special Features</h4>
                        <p class="lead">
                            {{ spot.specialFeatures }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                <h4>Bookings</h4>
                <div class="list-group list-group-flush">
                    <div class="list-group-item" v-for="(booking, index) in spot.bookings.items">
                        <div class="row">
                            <div class="col-2" v-if="booking.user.avatar">
                                <img :src="booking.user.avatar.downloadUrl" alt="" class="img-fluid">
                            </div>
                            <div class="col d-flex flex-column justify-content-center">
                                <h4>{{ booking.user.firstName }} {{ booking.user.lastName }}</h4>
                                <h5>{{ booking.duration }} Hour(s)</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <div class="row spot-time-picker text-center">
                    <div class="col">
                        <button class="btn btn-outline-dark" @click="hoursWanted-=1"> < </button>
                        <input type="number" class="number" v-model="hoursWanted">
                        <button class="btn btn-outline-dark" @click="hoursWanted+=1"> > </button>
                    </div>
                    <div class="col text-center">
                        <h5>Rate: <small class="font-weight-bold">{{ spot.price }}/hr</small></h5>
                        <h4>Total: <small class="font-weight-bold">${{ hoursWanted*spot.price }}</small></h4>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-dark btn-lg btn-block" @click="spotMe">Spot It</button>
                    </div>
                </div>
            </div>
        </div>
        <booking-confirmation v-on:bookingCreated="updateDetails" :spot="spot" :duration="hoursWanted"></booking-confirmation>
    </div>
</template>

<script>
    import gql from 'graphql-tag';
    import BookingConfirmation from '@/components/BookingConfirmation.vue';
    import $ from 'jquery';

    export default {
        name: 'spot-details',
        props: {
        },
        data: function() {
            return {
                spot: {},
                hoursWanted: 1
            }
        },
        components: {
            BookingConfirmation
        },
        watch: {
            '$route' (to, from) {
                this.$apollo.queries.spot.refetch();
                console.log(this.$route.params.id)
            }
        },
        apollo: {
            spot: {
                query: gql`query GetSpot($id:ID!) {
                  spot(id: $id) {
                    address {
                      street1
                      street2
                      city
                      state
                      zip
                    }
                    id
                    price
                    available_start
                    available_end
                    instant
                    description
                    rules
                    specialFeatures
                    picture {
                      downloadUrl
                    }
                    user {
                      firstName
                      lastName
                      avatar {
                        downloadUrl
                      }
                    }
                    bookings(orderBy:createdAt_DESC) {
                      items {
                        duration
                        user {
                          firstName
                          lastName
                          avatar {
                            downloadUrl
                          }
                        }
                      }
                    }
                  }
                }`,
                variables() {
                    return {
                        id: this.$route.params.id
                    }
                }
            }
        },
        methods: {
            spotMe: function () {
                $(document).ready(function() {
                    $('#booking-confirmation').modal('show');
                });
            },
            updateDetails: function () {
                this.$apollo.queries.spot.refetch();
            }
        }
    }
</script>

<style lang="scss">
    .host-image {
        width: 250px;
        height: 250px;
        background: url("https://cdn.filestackcontent.com/security=p:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MTU0OTEzMzQ5NDk0OSwiaGFuZGxlIjoiSDVpUnFCUjF5TU9zVkVleHBpakEifQ==,s:4f364b60ecbcfa254ed65229e99b9dac7903cc57b03ac554d739e0d4506f6388/H5iRqBR1yMOsVEexpijA");
        background-position: center;
        border-radius: 50%;
        margin: auto;
    }

    .spot-time-picker {
        .number {
            width: 60px;
            border: none;
            background: transparent;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-left: 5px;
            margin-right: 5px;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }
</style>

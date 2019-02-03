<template>
    <div class="modal" tabindex="-1" role="dialog" id="booking-confirmation">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Your Booking</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container-fluid text-left">
                    <img v-if="spot.picture" :src="spot.picture.downloadUrl" alt="" class="img-fluid">
                    <p v-if="!spot.picture" class="lead text-muted text-center mt-5">No Image Available</p>
                    <hr>
                    <div class="row">
                        <div class="col-4">
                            <div class="host-image-confirmation"></div>
                        </div>
                        <div class="col d-flex flex-column justify-content-center">
                            <h4 class="text-center mt-2">Hosted By: {{ spot.user.firstName }} {{ spot.user.lastName }}</h4>
                        </div>
                    </div>
                    <hr>
                    <p class="lead text-muted text-center"> Oy! check the information below mate, make sure it is what you want.</p>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <h4>Address</h4>
                                <div class="parking-spot-address text-left">
                                    <div class="street-line">{{ spot.address.street1 }}<span v-if="spot.address.street2">, {{ spot.address.street2 }}</span></div>
                                    <div class="city-state">{{ spot.address.city }}, {{ spot.address.state }}</div>
                                    <div class="zip">{{ spot.address.zip }}</div>
                                    <div class="pricing"> price: ${{spot.price}}</div>
                                </div>
                            </div>
                            <div class="col text-right">
                                <h4>Order Summary</h4>
                                <h5>Rate: <small>${{ spot.price }}/hr</small></h5>
                                <h5>Duration: <small>{{ duration }} Hour(s)</small></h5>
                                <h5>Total: <small>${{ spot.price*duration }}</small></h5>
                            </div>
                        </div>
                        <hr>
                        <div class="form-check text-center" style="font-size: 24px">
                            <input class="form-check-input" style="display: none;" type="checkbox" v-model="agreed" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                <i class="fa fa-check fa-1x" style="color: green" v-if="agreed"></i>
                                <i class="far fa-square fa-1x" v-if="!agreed"></i>
                                Okay,Everything looks good!
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" :disabled="!agreed" @click="createBooking">
                        <span v-if="!$apollo.loading">Spott It</span>
                        <span v-if="$apollo.loading">Loading...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import $ from 'jquery'

    export default {
        name: 'booking-confirmation',
        props: ['duration','spot'],
        data: function() {
            return {
                agreed: false
            }
        },
        methods: {
            createBooking() {
                console.log(`spotID: ${this.spot}`)
                const model = {
                    duration: this.duration,
                    spot: {
                        connect: {
                            id: this.spot.id
                        }
                    },
                    user: {
                        connect: {
                            id: "cjrn33mil003401qrv0fzgz55"
                        }
                    }
                }

                console.log(model);
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation AddBooking($data: BookingCreateInput!) {
                      bookingCreate(data: $data) {
                        id
                      }
                    }`,
                    // Parameters
                    variables: {
                        data: model,
                    }
                }).then(function () {
                    $("#booking-confirmation").modal('toggle');
                    this.$emit('bookingCreated');
                }.bind(this));
            }
        }
    }
</script>

<style lang="scss">
    .host-image-confirmation {
        width: 100px;
        height: 100px;
        background: url("https://cdn.filestackcontent.com/security=p:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MTU0OTEzMzQ5NDk0OSwiaGFuZGxlIjoiSDVpUnFCUjF5TU9zVkVleHBpakEifQ==,s:4f364b60ecbcfa254ed65229e99b9dac7903cc57b03ac554d739e0d4506f6388/H5iRqBR1yMOsVEexpijA");
        background-position: center;
        border-radius: 50%;
        margin: auto;
    }
</style>

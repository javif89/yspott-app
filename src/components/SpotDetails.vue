<template>
    <div class="container text-left">
        <div class="row">
            <div class="col">
                <img v-if="spot.picture" :src="spot.picture.downloadUrl" alt="" class="img-fluid">
                <h3>Address</h3>
                <div class="parking-spot-address text-left">
                    <div class="street-line">{{ spot.address.street1 }}<span v-if="spot.address.street2">, {{ spot.address.street2 }}</span></div>
                    <div class="city-state">{{ spot.address.city }}, {{ spot.address.state }}</div>
                    <div class="zip">{{ spot.address.zip }}</div>
                </div>
                <h3>Description</h3>
                <p class="lead">
                    {{ spot.description }}
                </p>
                <h3>Instant</h3>
                <p class="lead">
                    {{ spot.instant }}
                </p>
                <h3>Rules</h3>
                <p class="lead">
                    {{ spot.rules }}
                </p>
                <h3>Special Features</h3>
                <p class="lead">
                    {{ spot.specialFeatures }}
                </p>
                <h3>available_start</h3>
                <p class="lead">
                    {{ spot.available_start }}
                </p>
                <h3>available_end</h3>
                <p class="lead">
                    {{ spot.available_end }}
                </p>
            </div>
            <div class="col">
                <h1 class="text-center">Host</h1>
                <div class="host-image"></div>
                <h3>Name</h3>
                <h5>{{ spot.user.firstName }} {{ spot.user.lastName }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    export default {
        name: 'spot-details',
        props: {
        },
        data: function() {
            return {
                spot: {}
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

        }
    }
</script>

<style lang="scss">
    .host-image {
        width: 300px;
        height: 300px;
        background: url("https://cdn.filestackcontent.com/security=p:eyJjYWxsIjpbInJlYWQiLCJjb252ZXJ0Il0sImV4cGlyeSI6MTU0OTEzMzQ5NDk0OSwiaGFuZGxlIjoiSDVpUnFCUjF5TU9zVkVleHBpakEifQ==,s:4f364b60ecbcfa254ed65229e99b9dac7903cc57b03ac554d739e0d4506f6388/H5iRqBR1yMOsVEexpijA");
        background-position: center;
        border-radius: 50%;
        margin: auto;
    }
</style>

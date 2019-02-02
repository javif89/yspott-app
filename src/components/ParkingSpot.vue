<template>
    <div class="card parking-spot">
        <div class="card-header text-left">
            Parking Spot by: {{ data.users.firstName }} {{ data.users.lastName }}
        </div>
        <div class="card-body">
            <div class="parking-spot-address text-left">
                <div class="street-line">{{ data.address.street1 }}<span v-if="data.address.street2">, {{ data.address.street2 }}</span></div>
                <div class="city-state">{{ data.address.city }}, {{ data.address.state }}</div>
                <div class="zip">{{ data.address.zip }}</div>
            </div>
        </div>
        <div class="card-footer">
            <router-link class="btn btn-dark btn-block" :to="{ name: 'spot', params: {id: data.id} }">View</router-link>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    export default {
        name: 'parking-spot',
        props: {
            data: Object
        },
        data: function() {
            return {
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss">

</style>

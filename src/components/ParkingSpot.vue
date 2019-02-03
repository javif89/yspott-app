<template>
    <div class="card parking-spot">
        <div class="card-body">
            <div class="row">
                <div class="col">
                    <div class="d-flex flex-column justify-content-between parking-spot-address text-left">
                        <div class="street-line">{{ data.address.street1 }}<span v-if="data.address.street2">, {{ data.address.street2 }}</span></div>
                        <div class="city-state">{{ data.address.city }}, {{ data.address.state }}</div>
                        <div class="zip">{{ data.address.zip }}</div>
                        <div class="pricing"> price: ${{data.price}}/hr</div>
                        <router-link class="btn btn-dark btn-block" :to="{ name: 'spot', params: {id: data.id} }">View</router-link>
                    </div>
                </div>
                <div v-if="data.picture" class="col-6 d-flex flex-column justify-content-center">
                    <img :src="data.picture.downloadUrl" alt="" class="img-fluid">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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

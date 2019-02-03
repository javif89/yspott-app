<template>
    <div class="modal" tabindex="-1" role="dialog" id="add-spot-modal">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add a Spot</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body container-fluid text-left">
                    <div class="create-spot-form">
                        <div class="form-group address-group">
                            <label for="">Address 1</label>
                            <input type="text" placeholder="Placeholder" v-model="address.street1" class="form-control">
                            <label for="" class="mt-2">Address 2</label>
                            <input type="text" placeholder="Placeholder" v-model="address.street2" class="form-control">
                            <div class="row mt-2">
                                <div class="col">
                                    <label class="mt-2" for="">City</label><br>
                                    <input type="text" class="form-control" v-model="address.city">
                                </div>
                                <div class="col">
                                    <label class="mt-2" for="">State</label><br>
                                    <input type="text" class="form-control" v-model="address.state">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <label class="mt-2" for="">Zip</label><br>
                                    <input type="text" class="form-control" v-model="address.zip">
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <p class="lead text-muted">Can people just book and park? Or is there something else that needs to happen first?</p>
                            <span class="switch">
                              <input type="checkbox" class="switch" id="switch-id" v-model="instant">
                              <label for="switch-id">Instant Booking</label>
                            </span>
                        </div>
                        <hr>
                        <div class="form-group">
                            <h5>Availability</h5>
                            <div class="row">
                                <div class="col">
                                    <label for="">Start</label>
                                    <datetime v-model="available_start" type="time" use12-hour="true"></datetime>
                                </div>
                                <div class="col">
                                    <label for="">Start</label>
                                    <datetime v-model="available_end" type="time" use12-hour="true"></datetime>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <div class="row">
                                <div class="col">
                                    <label for="">Price/Hr</label>
                                    <input type="number" class="form-control" v-model="price">
                                </div>
                                <div class="col">
                                    <label for="">Spots Available</label>
                                    <input type="number" class="form-control" v-model="spotsAvailable">
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label for="">Description</label>
                            <textarea v-model="description" class="form-control" placeholder="Nice spot near the arena"></textarea>
                            <label for="" class="mt-2">Rules</label>
                            <textarea v-model="rules" name="" id="" class="form-control" placeholder="No parking big trucks"></textarea>
                            <label for="" class="mt-2">Special Features</label>
                            <textarea v-model="specialFeatures" name="" id="" class="form-control" placeholder="cameras, guarder community"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" @click="createSpot" class="btn btn-primary">
                        <span v-if="!$apollo.loading">Save changes</span>
                        <span v-if="$apollo.loading">Loading...</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import gql from 'graphql-tag';

    export default {
        name: 'create-spot-form',
        props: {

        },
        data: function() {
            return {
                address: {
                    street1:  '1301 sw 67th av',
                    street2: 'apt 4',
                    city: 'Miami',
                    state: 'FL',
                    zip: 33144
                },
                price: 14,
                available_start: '2019-02-02T21:51:00.000Z',
                available_end: '2019-02-02T21:51:00.000Z',
                instant: true,
                spotsAvailable: 1,
                description: "Default desc",
                rules: "default rulezzz",
                specialFeatures: "default special whatever"
            }
        },
        methods: {
            createSpot() {
                const model = {
                    address: this.address,
                    price: this.price,
                    available_start: this.available_start,
                    available_end: this.available_end,
                    instant: this.instant,
                    spotsAvailable: this.spotsAvailable,
                    description: this.description,
                    rules: this.rules,
                    specialFeatures: this.specialFeatures,
                    user: {
                        connect: {
                            id: "cjrn33mil003401qrv0fzgz55" //@TODO Make this dynamic when login is implemented
                        }
                    }
                };
                //This is terrible but whatever
                model.address.country = "United States";

                console.log(model);
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation CreateSpot($data: SpotCreateInput!) {
                      spotCreate(data: $data) {
                        id
                      }
                    }`,
                    // Parameters
                    variables: {
                        data: model,
                    }
                }).then(function () {
                   $("#add-spot-modal").modal('toggle');
                   this.$emit('spotCreated');
                }.bind(this));
            }
        }
    }
</script>

<style lang="scss">
    $font-size-base: 1rem;
    $font-size-lg: ($font-size-base * 1.25);
    $font-size-sm: ($font-size-base * .875);
    $input-height: 2.375rem;
    $input-height-sm: 1.9375rem;
    $input-height-lg: 3rem;
    $input-btn-focus-width: .2rem;
    $custom-control-indicator-bg: #dee2e6;
    $custom-control-indicator-disabled-bg: #e9ecef;
    $custom-control-description-disabled-color: #868e96;
    $white: white;
    $theme-colors: (
            'primary': #08d
    );

    //
    // These variables can be used to customize the switch component.
    //
    $switch-height: calc(#{$input-height} * .8) !default;
    $switch-height-sm: calc(#{$input-height-sm} * .8) !default;
    $switch-height-lg: calc(#{$input-height-lg} * .8) !default;
    $switch-border-radius: $switch-height !default;
    $switch-bg: $custom-control-indicator-bg !default;
    $switch-checked-bg: map-get($theme-colors, 'primary') !default;
    $switch-disabled-bg: $custom-control-indicator-disabled-bg !default;
    $switch-disabled-color: $custom-control-description-disabled-color !default;
    $switch-thumb-bg: $white !default;
    $switch-thumb-border-radius: 50% !default;
    $switch-thumb-padding: 2px !default;
    $switch-focus-box-shadow: 0 0 0 $input-btn-focus-width rgba(map-get($theme-colors, 'primary'), .25);
    $switch-transition: .2s all !default;

    .switch {
        font-size: $font-size-base;
        position: relative;

        input {
            position: absolute;
            height: 1px;
            width: 1px;
            background: none;
            border: 0;
            clip: rect(0 0 0 0);
            clip-path: inset(50%);
            overflow: hidden;
            padding: 0;

            + label {
                position: relative;
                min-width: calc(#{$switch-height} * 2);
                border-radius: $switch-border-radius;
                height: $switch-height;
                line-height: $switch-height;
                display: inline-block;
                cursor: pointer;
                outline: none;
                user-select: none;
                vertical-align: middle;
                text-indent: calc(calc(#{$switch-height} * 2) + .5rem);
            }

            + label::before,
            + label::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: calc(#{$switch-height} * 2);
                bottom: 0;
                display: block;
            }

            + label::before {
                right: 0;
                background-color: $switch-bg;
                border-radius: $switch-border-radius;
                transition: $switch-transition;
            }

            + label::after {
                top: $switch-thumb-padding;
                left: $switch-thumb-padding;
                width: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
                height: calc(#{$switch-height} - calc(#{$switch-thumb-padding} * 2));
                border-radius: $switch-thumb-border-radius;
                background-color: $switch-thumb-bg;
                transition: $switch-transition;
            }

            &:checked + label::before {
                background-color: $switch-checked-bg;
            }

            &:checked + label::after {
                margin-left: $switch-height;
            }

            &:focus + label::before {
                outline: none;
                box-shadow: $switch-focus-box-shadow;
            }

            &:disabled + label {
                color: $switch-disabled-color;
                cursor: not-allowed;
            }

            &:disabled + label::before {
                background-color: $switch-disabled-bg;
            }
        }

        // Small variation
        &.switch-sm {
            font-size: $font-size-sm;

            input {
                + label {
                    min-width: calc(#{$switch-height-sm} * 2);
                    height: $switch-height-sm;
                    line-height: $switch-height-sm;
                    text-indent: calc(calc(#{$switch-height-sm} * 2) + .5rem);
                }

                + label::before {
                    width: calc(#{$switch-height-sm} * 2);
                }

                + label::after {
                    width: calc(#{$switch-height-sm} - calc(#{$switch-thumb-padding} * 2));
                    height: calc(#{$switch-height-sm} - calc(#{$switch-thumb-padding} * 2));
                }

                &:checked + label::after {
                    margin-left: $switch-height-sm;
                }
            }
        }

        // Large variation
        &.switch-lg {
            font-size: $font-size-lg;

            input {
                + label {
                    min-width: calc(#{$switch-height-lg} * 2);
                    height: $switch-height-lg;
                    line-height: $switch-height-lg;
                    text-indent: calc(calc(#{$switch-height-lg} * 2) + .5rem);
                }

                + label::before {
                    width: calc(#{$switch-height-lg} * 2);
                }

                + label::after {
                    width: calc(#{$switch-height-lg} - calc(#{$switch-thumb-padding} * 2));
                    height: calc(#{$switch-height-lg} - calc(#{$switch-thumb-padding} * 2));
                }

                &:checked + label::after {
                    margin-left: $switch-height-lg;
                }
            }
        }

        + .switch {
            margin-left: 1rem;
        }
    }
</style>

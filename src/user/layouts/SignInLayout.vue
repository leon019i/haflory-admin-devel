<template>
  <v-container fluid class="py-auto min-100-height grey6">
    <v-row class="min-100-height">
      <v-col
        order="1"
        cols="12"
        sm="4"
        lg="3"
        align="center"
        align-self="center"
        class="pa-6 ps-lg-12"
      >
        <!-- <h1 class="roboto-font primary--text">{{$t('general.appName')}}</h1>
        <h6 class="white--text font-weight-light">{{$t('general.caption')}}</h6>-->

        <v-img
          :src="require('@/core/assets/images/logo.png')"
          class="mt-n6"
          contain
          height="234"
          width="234"
        ></v-img>
      </v-col>
      <v-col order="2" cols="12" sm="8" lg="9" class="white my-sm-n12" align-self="center">
        <v-row
          align-self="center"
          align="center"
          justify="center"
          :class="{'min-100-height' :  !$vuetify.breakpoint.smAndDown}"
        >
          <v-col order="3" cols="12" sm="1" lg="3" class="white my-sm-n12"></v-col>
          <v-col order="5" cols="12" sm="1" lg="4" class="white my-sm-n12"></v-col>
          <!-- form -->
          <v-col order="4" cols="12" sm="10" lg="4" class="white pa-6" align="start">
            <slot>
              <!-- content comes here  -->
            </slot>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.min-100-height {
  min-height: 100vh !important;
}
</style>
<template>
  <div class="pa-12">
    <h2 class="primary--text">{{$t('user.pointRatio.priceToPoint')}}</h2>
    <v-row>
      <h2 class="pa-4 secondary--text">{{pointRatioInput.amount}} KWD =</h2>

      <v-col cols="12" sm="2">
        <v-text-field
          rounded
          @change="updatePoint"
          color="primary"
          v-model="pointRatioInput.point"
          text
          flat
          solo-inverted
        ></v-text-field>
      </v-col>
      <h2 class="pa-4 secondary--text">{{$t('user.pointRatio.points')}}</h2>
    </v-row>
    <br />
    <br />
    <br />
    <br />
    <br />
    <v-row>
      <h2 class="pa-4 secondary--text">{{pointRatioInput.amount}} KWD =</h2>

      <v-col cols="12" sm="2">
        <v-text-field
          rounded
          @change="updatePoint"
          color="primary"
          v-model="pointRatioInput.point"
          text
          flat
          solo-inverted
        ></v-text-field>
      </v-col>
      <h2 class="pa-4 secondary--text">{{$t('user.pointRatio.points')}}</h2>
    </v-row>
  </div>
</template>

<script>
import { updateConversionPoint } from "@/user/methods/update_point.js";
export default {
  data() {
    return {
      pointRatioInput: {
        id: 0,
        amount: 1,
        point: 0,
      },
    };
  },
  apollo: {
    conversionDetails() {
      return {
        query: require("@/user/api/queries/points_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          this.pointRatioInput.id = data.conversionDetails._id;
          this.pointRatioInput.point = data.conversionDetails.point;
          this.pointRatioInput.amount = data.conversionDetails.amount;
        },
      };
    },
  },
  methods: {
    updatePoint() {
      updateConversionPoint(this.pointRatioInput).then((data) => {});
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>
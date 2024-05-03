<template>
  <div>
    <v-container>
      <v-card class="pa-12" elevation="0">
        <h3 class="primary--text">{{$t('settings.appPolicy')}}</h3>
        <v-row class="mt-6">
          <v-col cols="12" sm="12" md="5" class="ms-4">
            <v-textarea
              v-model="settings.detailsEn"
              @change="update"
              rows="13"
              outlined
              color="secondary"
              :label="$t('settings.Policies')"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="12" md="5" class="ms-4">
            <v-textarea
              v-model="settings.detailsAr"
              outlined
              rows="13"
              @change="update"
              color="secondary"
              :label="$t('settings.PoliciesAr')"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { updatePolicy } from "@/settings/methods/update_policy.js";
export default {
  data() {
    return {
      settings: {
        id: 0,
        detailsEn: null,
        detailsAr: null,
      },
    };
  },

  apollo: {
    policies() {
      return {
        query: require("@/settings/api/queries/policies.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          this.settings.id = data.policies[0]._id;
          this.settings.detailsEn = data.policies[0].detailsEn;
          this.settings.detailsAr = data.policies[0].detailsAr;
        },
      };
    },
  },
  methods: {
    update() {
      // console.log(this.settings);
      updatePolicy(this.settings);
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>
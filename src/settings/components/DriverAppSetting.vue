<template>
  <div>
    <div class="pa-3">
      <v-card elevation="0" class="pa-12">
        <h2 class="primary--text mb-5">
          {{ $t("settings.driverAppSetting") }}
        </h2>
        <v-row align="center">
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.maxPending") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  color="primary"
                  type="number"
                  :min="0"
                  v-model="driverSettingInput.pendingOrders"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.maxPerDay") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  color="primary"
                  type="number"
                  :min="0"
                  v-model="driverSettingInput.acceptableOrders"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.orderdisplayTime") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-dialog
                  ref="dialog"
                  v-model="menu2"
                  :return-value.sync="driverSettingInput.orderDisplayTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="driverSettingInput.orderDisplayTime"
                      readonly
                      outlined
                      color="primary"
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    ampm-in-title
                    v-if="menu2"
                    v-model="driverSettingInput.orderDisplayTime"
                    full-width
                    @click:minute="
                      $refs.dialog.save(driverSettingInput.orderDisplayTime)
                    "
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.dialog.save(driverSettingInput.orderDisplayTime)
                      "
                      >OK</v-btn
                    >
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.maxNumber") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  color="primary"
                  type="number"
                  :min="0"
                  v-model="driverSettingInput.transferLimit"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col> -->
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" md="2">
                <v-btn
                  v-if="showSaveButton"
                  @click="updateSettings"
                  class="primary text-none"
                  depressed
                  :loading="isLoading"
                  >{{ $t("payment.save") }}</v-btn
                >
              </v-col>
              <v-col cols="12" md="6" class="mt-n4">
                <div class="pa-5" v-if="isUpdated">
                  <span class="success--text font-weight-normal">{{
                    $t("settings.driverSettingsUpdated")
                  }}</span>
                  <v-icon color="success" class="pa-2" small>mdi-check</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { updateDriverConfigApp } from "@/settings/methods/update_driver_app_setting.js";

export default {
  data() {
    return {
      driverSettingInput: {
        id: 0,
        pendingOrders: 0,
        acceptableOrders: 0,
        orderDisplayTime: null,
        transferLimit: 0,
      },
      menu2: false,
      isUpdated: false,
      showSaveButton: false,
      isLoading: false,
    };
  },

  watch: {
    driverSettingInput: {
      handler(newVal) {
        this.showSaveButton = true;
      },
      deep: true,
    },
  },

  apollo: {
    driverAppConfig() {
      return {
        query: require("@/settings/api/queries/driver_app_setting.graphql"),

        result({ data, loading, networkStatus, refetch }) {
          if (!!data) {
            // console.log("driver app",data);
            if (!!data.driverAppConfig) {
              this.driverSettingInput.id = data.driverAppConfig._id;
              this.driverSettingInput.pendingOrders =
                data.driverAppConfig.pendingOrders;
              this.driverSettingInput.orderDisplayTime =
                data.driverAppConfig.orderDisplayTime;
              this.driverSettingInput.transferLimit =
                data.driverAppConfig.transferLimit;
              this.driverSettingInput.acceptableOrders =
                data.driverAppConfig.acceptableOrders;
              // this.showSaveButton = false;
            }
          }
        },
      };
    },
  },
  methods: {
    updateSettings() {
      this.isLoading = true;
      updateDriverConfigApp(this.driverSettingInput).then((data) => {
        this.isUpdated = true;
        var self = this;
        setInterval(function () {
          self.isUpdated = false;
          self.isLoading = false;
          self.showSaveButton = false;
        }, 3000);
      });
    },
  },
};
</script>
<style scoped>
>>> .v-input__control {
  width: 0;
}
</style>
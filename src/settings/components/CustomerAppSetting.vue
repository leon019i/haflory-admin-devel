<template>
  <div>
    <div class="pa-3">
      <v-card elevation="0" class="pa-12">
        <h2 class="primary--text mb-5">{{$t('settings.customeAppSetting')}}</h2>
        <v-row align="center">
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">{{$t('settings.maxAccept')}}</p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  color="primary"
                  type="number"
                  :min="0"
                  v-model="customerSettingInput.orderLimit"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">{{$t('settings.openingHours')}}</p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-dialog
                  ref="dialog1"
                  v-model="menu1"
                  :return-value.sync="customerSettingInput.openingHour"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="customerSettingInput.openingHour"
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
                    v-if="menu1"
                    v-model="customerSettingInput.openingHour"
                    full-width
                    @click:minute="$refs.dialog1.save(customerSettingInput.openingHour)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog1.save(customerSettingInput.openingHour)"
                    >OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold">{{$t('settings.closingHours')}}</p>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-dialog
                  ref="dialog"
                  v-model="menu2"
                  :return-value.sync="customerSettingInput.closingHour"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="customerSettingInput.closingHour"
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
                    v-model="customerSettingInput.closingHour"
                    full-width
                    @click:minute="$refs.dialog.save(customerSettingInput.closingHour)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(customerSettingInput.closingHour)"
                    >OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" md="2">
                <v-btn
                  v-if="showSaveButton"
                  @click="updateSettings"
                  class="primary text-none"
                  depressed
                  :loading="isLoading"
                >{{$t('payment.save')}}</v-btn>
              </v-col>
              <v-col cols="12" md="6" class="mt-n4">
                <div class="pa-5" v-if="isUpdated">
                  <span
                    class="success--text font-weight-normal"
                  >{{$t('settings.customerSettingsUpdated')}}</span>
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
import { updateUserConfigApp } from "@/settings/methods/update_user_app_setting.js";

export default {
  data() {
    return {
      customerSettingInput: {
        orderLimit: 0,
        openingHour: null,
        closingHour: null,
      },
      menu1: false,
      menu2: false,
      isUpdated: false,
      showSaveButton: false,
      isLoading: false,
    };
  },

  watch: {
    customerSettingInput: {
      handler(newVal) {
        this.showSaveButton = true;
      },
      deep: true,
    },
  },

  apollo: {
    userAppConfig() {
      return {
        query: require("@/settings/api/queries/user_app_setting.graphql"),

        result({ data, loading, networkStatus, refetch }) {
          if (!!data) {
            // console.log(data);
            if (!!data.userAppConfig) {
              this.customerSettingInput.orderLimit =
                data.userAppConfig.orderLimit;
              this.customerSettingInput.openingHour =
                data.userAppConfig.openingHour;
              this.customerSettingInput.closingHour =
                data.userAppConfig.closingHour;
              this.showSaveButton = false;
            }
          }
        },
      };
    },
  },
  methods: {
    updateSettings() {
      this.isLoading = true;
      // console.log(this.customerSettingInput);
      updateUserConfigApp(this.customerSettingInput).then((data) => {
        this.isUpdated = true;
        var self = this;
        self.isLoading = false;
        self.showSaveButton = false;

        setInterval(function () {
          self.isUpdated = false;
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
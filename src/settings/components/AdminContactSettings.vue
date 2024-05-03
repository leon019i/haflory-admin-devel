<template>
  <div>
    <v-container>
      <v-card elevation="0" class="pa-12">
        <v-card-title
          class="primary--text font-weight-bold heading-font ms-n3 mb-5"
        >
          {{ $t("settings.adminContacts") }}
        </v-card-title>
        <v-row align="center">
          <!-- <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.email") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.email"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col> -->
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <p class="secondary--text font-weight-bold pl-1">
                  {{ $t("settings.phone") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.phone"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <!-- <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.whatsapp") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.whatsapp"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.instagram") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.instagram"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.facebook") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.facebook"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.androidLink") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.androidLink"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="10" class="my-0 py-0">
            <v-row>
              <v-col cols="12" sm="12" md="4">
                <p class="secondary--text font-weight-bold">
                  {{ $t("settings.iosLink") }}
                </p>
              </v-col>
              <v-col cols="12" sm="6" md="8" class="my-0 py-0">
                <v-text-field
                  color="primary"
                  :min="0"
                  v-model="adminContactsInput.iosLink"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>-->

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
                    $t("settings.contactsSettingsUpdated")
                  }}</span>
                  <v-icon color="success" class="pa-2" small>mdi-check</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { updateAdminContacts } from "@/settings/methods/update_admin_contacts.js";

export default {
  data() {
    return {
      adminContactsInput: {
        id: 0,
        email: null,
        phone: null,
        whatsapp: null,
        instagram: null,
        facebook: null,
        androidLink: null,
        iosLink: null,
      },

      isUpdated: false,
      showSaveButton: true,
      isLoading: false,
    };
  },

  apollo: {
    adminContacts() {
      return {
        query: require("@/settings/api/queries/admin_contacts.graphql"),

        result({ data, loading, networkStatus, refetch }) {
          if (!!data) {
            // console.log("app", data);
            if (!!data.adminContacts) {
              this.adminContactsInput.id = data.adminContacts._id;

              this.adminContactsInput.email = data.adminContacts.email;

              this.adminContactsInput.phone = data.adminContacts.phone;

              this.adminContactsInput.whatsapp = data.adminContacts.whatsapp;

              this.adminContactsInput.instagram = data.adminContacts.instagram;

              this.adminContactsInput.facebook = data.adminContacts.facebook;

              this.adminContactsInput.androidLink =
                data.adminContacts.androidLink;

              this.adminContactsInput.iosLink = data.adminContacts.iosLink;

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
      updateAdminContacts(this.adminContactsInput).then((data) => {
        this.isUpdated = true;
        var self = this;
        setInterval(function () {
          self.isUpdated = false;

          self.showSaveButton = true;
        }, 3000);
        this.isLoading = false;
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
<template>
  <div>
    <v-container>
      <v-card class="pa-12" elevation="0">
        <v-card-title
          class="primary--text font-weight-bold heading-font ml-n3"
          >{{ $t("notification.sendNewNotification") }}</v-card-title
        >
        <ValidationObserver
          ref="observer"
          v-slot="{ validate, reset, invalid }"
        >
          <form>
            <v-row>
              <v-col cols="12" sm="12" md="6" class="py-0">
                <ValidationProvider v-slot="{ errors }">
                  <v-text-field
                    outlined
                    dense
                    :label="$t('notification.title')"
                    v-model="title"
                    color="secondary"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="6" class="py-0">
                <ValidationProvider v-slot="{ errors }">
                  <v-textarea
                    outlined
                    v-model="message"
                    :error-messages="errors"
                    color="secondary"
                    :label="$t('notification.message')"
                  ></v-textarea>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2">
                <v-btn
                  v-if="message"
                  @click="sendNotification"
                  class="primary text-none"
                  :disabled="invalid"
                  depressed
                  :loading="isLoading"
                  >{{ $t("notification.sent") }}</v-btn
                >
              </v-col>
              <v-col cols="12" md="6" class="mt-n4">
                <div class="pa-5" v-if="isUpdated">
                  <span class="success--text font-weight-normal">{{
                    $t("notification.notificationSent")
                  }}</span>
                  <v-icon color="success" class="pa-2" small>mdi-check</v-icon>
                </div>
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { createNotification } from "@/notification/methods/create_notification.js";
import "@/core/methods/validation_rules";

export default {
  data() {
    return {
      message: "",
      title: "New notification",
      isUpdated: false,
      showSaveButton: true,
      isLoading: false,
    };
  },

  methods: {
    sendNotification() {
      this.isLoading = true;

      createNotification(this.title, this.message).then((data) => {
        this.isUpdated = true;
        var self = this;
        setInterval(function () {
          self.isUpdated = false;
        }, 3000);
        this.message = null;
        this.title = null;
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
<template>
  <div>
    <div class="pa-3">
      <v-card elevation="0" rounded="0" class="pa-md-12">
        <h2 class="primary--text mb-5 pa-2">{{ $t("chat.chats") }}</h2>
        <div>
          <v-container class="pa-0 fill-height">
            <v-row class="no-gutters elevation-3">
              <v-col
                cols="12"
                sm="3"
                xl="2"
                class="flex-grow-1 flex-shrink-0 right-side-line"
              >
                <v-responsive
                  class="overflow-y-auto fill-height"
                  max-height="700"
                >
                  <v-list subheader>
                    <v-list-item-group v-model="activeChat">
                      <template v-for="(item, index) in getChatCustomer">
                        <v-list-item
                          v-if="!!item"
                          :key="`parent${index}`"
                          @click="
                            currentCustomer = item.customer;
                            currentCustomerName = item.customerName;
                            markRead(
                              item.customer,
                              item.adminUnreadMessageCount
                            );
                          "
                          :value="item.customer"
                        >
                          <v-list-item-content>
                            <v-list-item-title
                              v-if="!!item.customerName"
                              class="secondary--text font-weight-bold"
                              v-text="item.customerName"
                            />
                            <v-list-item-title
                              v-else
                              class="secondary--text font-weight-bold"
                              v-text="`Customer ${index + 1}`"
                            />
                          </v-list-item-content>
                          <v-list-item-icon>
                            <!-- <v-icon
                              size="15"
                              :color="
                                !item.adminRead
                                  ? 'primary accent-4'
                                  : 'transparent'
                              "
                              >mdi-checkbox-blank-circle</v-icon
                            > -->
                            <v-badge
                              v-if="
                                item.adminUnreadMessageCount > 0 &&
                                !item.supporterRead
                              "
                              color="primary"
                              :content="item.adminUnreadMessageCount"
                              offset-x="20"
                              offset-y="17"
                            >
                            </v-badge>
                          </v-list-item-icon>
                        </v-list-item>
                        <v-divider :key="`chatDivider${index}`" class="my-0" />
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-responsive>
              </v-col>
              <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
                <!-- v-if="activeChat" -->
                <v-responsive
                  v-if="currentCustomer != null && onLine"
                  class="overflow-y-hidden fill-height"
                  height="700"
                >
                  <v-card
                    flat
                    class="d-flex flex-column fill-height"
                    rounded="0"
                  >
                    <v-card color="primary" elevation="5" rounded="0">
                      <v-card-title class="white--text">{{
                        currentCustomerName != "" && currentCustomerName != null
                          ? currentCustomerName
                          : `New Customer`
                      }}</v-card-title>
                    </v-card>
                    <v-card-text class="flex-grow-1 overflow-y-auto">
                      <div v-for="(item, i) in currentMessage" :key="i">
                        <p class="text-center">
                          <v-chip outlined>
                            {{ new Date(parseInt(item.date)).toDateString() }}
                          </v-chip>
                        </p>
                        <template v-for="(msg, index) in item.messages">
                          <div
                            :class="{
                              'd-flex flex-row-reverse': msg.from == 'ADMIN',
                            }"
                            :key="index"
                          >
                            <div style="max-width: 450px">
                              <v-chip
                                :color="
                                  msg.from == 'ADMIN'
                                    ? 'grey5 black--text'
                                    : 'primary'
                                "
                                dark
                                style="height: auto; white-space: normal"
                                class="pa-4 mb-2"
                              >
                                {{ msg.content }}
                                <sub
                                  class="ml-2"
                                  style="font-size: 0.5rem; min-width: 40px"
                                >
                                  {{ tConvert(msg.time) }}</sub
                                >
                                <!-- <div class="mt-2">
                                  <sub>
                                    <v-icon size="12" v-if="!msg.read">
                                      mdi-check
                                    </v-icon>
                                    <v-icon v-else size="12" color="blue">
                                      mdi-check-all
                                    </v-icon>
                                  </sub>
                                </div> -->
                              </v-chip>
                            </div>
                          </div>
                        </template>
                      </div>
                    </v-card-text>
                    <v-card-text class="flex-shrink-1">
                      <v-text-field
                        v-model="content"
                        :label="this.$t('chat.startTyping')"
                        rounded
                        outlined
                        append-outer-icon="mdi-send"
                        @keyup.enter="sendTheMessage(content)"
                        @click:append-outer="sendTheMessage(content)"
                        hide-details
                      />
                    </v-card-text>
                  </v-card>
                </v-responsive>
                <v-responsive
                  v-else
                  class="overflow-y-hidden fill-height"
                  height="700"
                >
                  <v-card
                    flat
                    align="center"
                    class="d-flex flex-column fill-height"
                  >
                    <v-card-text class="flex-grow-1 overflow-y-auto">
                      <div v-if="onLine">
                        <v-icon size="90">mdi-wifi</v-icon>
                        <h2 class="primary--text mb-5 pa-2">
                          {{ $t("chat.connected") }}
                        </h2>
                        <p>{{ $t("chat.startReply") }}</p>
                      </div>
                      <div v-else>
                        <v-icon size="90">mdi-wifi-off</v-icon>
                        <h2 class="primary--text mb-5 pa-2">
                          {{ $t("chat.deviceNotConnected") }}
                        </h2>
                        <p>{{ $t("chat.activeInternet") }}</p>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-responsive>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { sendMessage } from "@/chat/methods/send_message.js";
import gql from "graphql-tag";
import { markAsRead } from "@/chat/methods/markAsRead.js";
export default {
  data: () => ({
    activeChat: 1,
    currentCustomer: null,
    currentCustomerName: null,
    currentMessage: [],

    content: "",
    onLine: navigator.onLine,
    showBackOnline: false,
  }),
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  apollo: {
    getChatCustomer() {
      return {
        query: require("@/chat/api/queries/customer_name_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log(data);
          // this.currentCustomer = data.getChatCustomer[0].customer;
          // this.currentCustomerName = data.getChatCustomer[0].customerName;
        },
      };
    },
    chatList() {
      return {
        variables: {
          limit: 0,
          skip: 0,
          customer: this.currentCustomer,
        },
        query: require("@/chat/api/queries/chat_list_query.graphql"),

        result({ data, loading, networkStatus, refetch }) {
          if (!!data.chatList) {
            if (!!data.chatList.chats) {
              // console.log(data);
              this.currentMessage = data.chatList.chats.reverse();
            }
          }
        },
        subscribeToMore: {
          document: gql`
            subscription onMessage($customer: String) {
              onMessage(customer: $customer) {
                customer
                customerName
                date
                message {
                  _id
                  from
                  to
                  date
                  time
                  content
                  read
                }
              }
            }
          `,
          variables() {
            return {
              customer: this.currentCustomer,
            };
          },
          updateQuery: (previousResult, { subscriptionData }) => {
            // console.log(previousResult, subscriptionData);

            let currentIndex = previousResult["chatList"]["chats"].findIndex(
              (t) => t.date === subscriptionData.data.onMessage.date
            );
            // console.log(currentIndex);
            if (currentIndex == 0 || currentIndex > 0) {
              previousResult["chatList"]["chats"][currentIndex][
                "messages"
              ].push(subscriptionData.data["onMessage"]["message"]);
            } else {
              let messageForm = {
                customer: subscriptionData.data["onMessage"]["customer"],
                customerName:
                  subscriptionData.data["onMessage"]["customerName"],
                date: subscriptionData.data["onMessage"]["date"],
                messages: [subscriptionData.data["onMessage"]["message"]],
              };
              previousResult["chatList"]["chats"].push(messageForm);
            }
          },
        },
      };
    },
  },
  watch: {
    currentCustomer: {
      handler() {
        this.$apollo.queries.chatList.refetch({
          limit: 0,
          skip: 0,
          customer: this.currentCustomer,
        });
      },
      deep: true,
    },
    onLine(v) {
      if (v) {
        this.showBackOnline = true;
        setTimeout(() => {
          this.showBackOnline = false;
        }, 1000);
      }
    },
  },
  methods: {
    markRead(id, count) {
      // console.log(id);
      if (count > 0) {
        markAsRead(id);
      } else {
        // console.log("no read");
      }
    },
    tConvert(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    },
    updateOnlineStatus(e) {
      const { type } = e;
      this.onLine = type === "online";
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    sendTheMessage(content) {
      if (content != "" && content != null) {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        const date = this.formatDate(today);
        let messageForm = {
          customer: this.currentCustomer,
          customerName: this.currentCustomerName,
          date: date,
          messages: {
            from: "ADMIN",
            to: this.currentCustomer,
            date: date,
            time: time,
            content: content,
          },
        };
        let variables = {
          limit: 0,
          skip: 0,
          customer: this.currentCustomer,
        };
        sendMessage(messageForm, variables).then((data) => {
          if (!!data.data) {
          } else {
          }
        });
        this.content = "";
      }
    },
  },
};
</script>

<style >
.right-side-line {
  border-right: 1px solid #0000001f;
}
</style>
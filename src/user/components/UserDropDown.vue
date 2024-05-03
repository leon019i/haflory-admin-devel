<template>
  <div>
    <div>
      <v-menu offset-y transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-row align="center">
            <v-col class="mt-1">
              <h3 color="primary--text">{{ user.role }}</h3>
            </v-col>
            <v-col class="mt-1">
              <router-link :to="`/${$i18n.locale}/chats`">
                <v-badge
                  :content="messages"
                  :value="messages"
                  color="secondary"
                  overlap
                >
                  <v-icon color="primary" class="" large> mdi-chat </v-icon>
                </v-badge>
              </router-link>
            </v-col>
            <v-col>
              <v-btn icon v-on="on">
                <Avatar
                  :username="user.nameEn"
                  :src="
                    'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +
                    user.avatar
                  "
                  :size="36"
                />
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <div style="max-height: 95vh">
          <v-list>
            <v-list-item class="ms-4">
              <v-row>
                <Avatar
                  :username="user.nameEn"
                  :size="36"
                  :src="
                    'https://haflory-dev-files.s3.me-south-1.amazonaws.com/' +
                    user.avatar
                  "
                  :rounded="true"
                  color="white"
                />
                <v-col align="start" class="mt-n1">
                  <p class="font-weight-medium primary--text my-n2">
                    {{ $store.getters.rtl ? user.nameAr : user.nameEn }}
                  </p>
                  <p class="font-weight-light caption primary20--text my-n2">
                    {{ user.email }}
                  </p>
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row justify="start" class="justify-space-around">
                <v-btn x-small outlined color="primary" @click="showDrawer">{{
                  $t("user.viewProfile")
                }}</v-btn>
                <v-btn x-small outlined color="error" @click="signout">{{
                  $t("user.signOut")
                }}</v-btn>
              </v-row>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import { onSignout } from "@/plugins/vue-apollo.js";
import { getCurrentUser } from "../utlis/helper.js";
import { mapActions, mapGetters } from "vuex";
import gql from "graphql-tag";

export default {
  components: {
    Avatar,
    SideDrawer: () => import("@/core/components/SideDrawer"),
  },

  data() {
    return {
      user: null,
      messages: 0,
      permission: false,
    };
  },
  computed: {
    ...mapGetters(["is_drawer"]),
  },
  created() {
    this.user = getCurrentUser.user;
    this.$notification.requestPermission().then((value) => {
      if (value == "granted") {
        // console.log(
        //   "%c Native notification Success",
        //   "font-weight:bold; font-size:20px; color:green"
        // );

        this.permission = true;
      } else {
        // console.log(
        //   "%c Native notification failed",
        //   "font-weight:bold; font-size:20px; color:red"
        // );

        this.permission = false;
      }
    });
  },
  apollo: {
    getChatCustomer() {
      return {
        query: require("@/chat/api/queries/customer_name_query.graphql"),
        result({ data, loading, networkStatus, refetch }) {
          // console.log("customer chat list", data.getChatCustomer);
          if (data.getChatCustomer.length > 0) {
            let sum = data.getChatCustomer
              .map((o) => o.adminUnreadMessageCount)
              .reduce((a, c) => {
                return a + c;
              });
            // console.log("sum", sum);
            this.messages = sum;
          }
        },
        subscribeToMore: {
          document: gql`
            subscription onMessageNotification {
              onMessageNotification {
                customer
                customerName
                lastDate
                lastAdminMessageDate
                adminUnreadMessageCount
                customerUnreadMessageCount
                adminRead
                customerRead
                lastMessage {
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
          updateQuery: (previousResult, { subscriptionData }) => {
            var filterArray = previousResult.getChatCustomer.filter(function (
              item
            ) {
              if (
                item.customer ==
                subscriptionData.data.onMessageNotification.customer
              )
                return item;
            });

            let currentIndex = previousResult.getChatCustomer.findIndex(
              (t) =>
                t.customer ===
                subscriptionData.data.onMessageNotification.customer
            );

            if (filterArray.length <= 0) {
              let newMessage = {
                customer: subscriptionData.data.onMessageNotification.customer,
                customerName:
                  subscriptionData.data.onMessageNotification.customerName,
                lastDate: subscriptionData.data.onMessageNotification.lastDate,
                adminRead:
                  subscriptionData.data.onMessageNotification.adminRead,
                customerRead:
                  subscriptionData.data.onMessageNotification.customerRead,
                adminUnreadMessageCount:
                  subscriptionData.data.onMessageNotification
                    .adminUnreadMessageCount,
              };
              previousResult.getChatCustomer.push(newMessage);
              location.reload();
            } else {
              previousResult.getChatCustomer[
                currentIndex
              ].adminUnreadMessageCount = 0;
              previousResult.getChatCustomer[
                currentIndex
              ].adminUnreadMessageCount =
                subscriptionData.data.onMessageNotification
                  .adminUnreadMessageCount +
                previousResult.getChatCustomer[currentIndex]
                  .adminUnreadMessageCount;
            }
            if (
              subscriptionData.data.onMessageNotification.lastMessage.from !=
              "ADMIN"
            ) {
              if (
                subscriptionData.data.onMessageNotification.customerName !=
                  null &&
                subscriptionData.data.onMessageNotification.customerName != ""
              ) {
                var name =
                  "You have message from " +
                  subscriptionData.data.onMessageNotification.customerName;
                console.log(name);
              } else {
                var name = "You have new message";
              }

              if (this.permission) {
                this.$notification.show(
                  name,
                  {
                    body:
                      subscriptionData.data.onMessageNotification.lastMessage
                        .content,
                  },
                  {}
                );
              }
              this.$notify({
                group: "foo",
                title: name,
                text:
                  subscriptionData.data.onMessageNotification.lastMessage
                    .content,
              });
              // }
              var audio = new Audio(
                require("@/core/assets/iphone_notification.mp3")
              );
              audio.play();
              document.title = "New Message !";
            }
          },
        },
      };
    },
  },
  methods: {
    signout() {
      onSignout(this.$apollo.provider.defaultClient);
      localStorage.removeItem("HAFLORY_USER");
      localStorage.removeItem("HAFLORY_ROLE");
      localStorage.removeItem("HAFLORY_PUSH_TOKEN");
      this.$router.replace({ path: "signin" });
    },
    ...mapActions(["showSideDrawer"]),
    showDrawer: function () {
      this.showSideDrawer("EditUser");
    },
  },
};
</script>
<style lang="scss">
.vue-notification {
  padding: 10px;
  margin: 0 5px 5px;

  font-size: 12px;

  color: #ffffff;
  background: #2b2b2b;
  border-left: 5px solid #e74a3b;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>

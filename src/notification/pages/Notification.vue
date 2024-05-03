<template>
  <div class="pa-sm-4 pa-md-10 pa-lg-12">
    <SendNotification />
    <NotificationDataTable />
  </div>
</template>
<script>
import { isAdmin, isSeller } from "@/user/utlis/helper.js";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    NotificationDataTable: () =>
      import("@/notification/components/NotificationDataTable.vue"),

    SideDrawer: () => import("@/core/components/SideDrawer"),

    SendNotification: () =>
      import("@/notification/components/SendNotification.vue"),
  },
  methods: {
    isAdmin,
  },
  computed: {
    ...mapGetters(["show_drawer", "is_drawer"]),
  },
  methods: {
    ...mapActions(["showSideDrawer"]),
    showDrawer: function () {
      this.showSideDrawer("AddCategory");
    },
  },
};
</script>

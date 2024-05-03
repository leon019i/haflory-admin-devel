import { apolloClient } from "@/plugins/vue-apollo.js";
import { updateClientCache } from "@/core/methods/update_cache.js";

const mutation = (
  _variables,
  _path,
  _readyQueryVariables,
  _isVariables,
  methodName,
  limitSkip
) => {
  let getDataFromApi = [];
  let fullPath = getFullPath(_path);

  getDataFromApi = apolloClient.mutate({
    mutation: fullPath,
    variables: _variables,
    update: (store, { data }) => {
      // console.log("mutaion",data);
      if (
        _readyQueryVariables.mutaion_name != "updateDriverConfigApp" &&
        _readyQueryVariables.mutaion_name != "updateOrderStatus" &&
        _readyQueryVariables.mutaion_name != "updateUser" &&
        _readyQueryVariables.mutaion_name != "updatePaymentKey" &&
        _readyQueryVariables.mutaion_name != "updateUserConfigApp" &&
        _readyQueryVariables.mutaion_name != "updateVariables" &&
        _readyQueryVariables.mutaion_name != "updateAdminContacts" &&
        _readyQueryVariables.mutaion_name != "deleteArea" &&
        _readyQueryVariables.mutaion_name != "updatePassword" &&
        _readyQueryVariables.mutaion_name != "subscribeChatNotification"
      ) {
        updateClientCache(
          store,
          data,
          _readyQueryVariables,
          _isVariables,
          methodName,
          _variables,
          limitSkip
        );
        // console.log("111")
      } else {
        // console.log("123")
      }
    },
  });
  return getDataFromApi;
};

//concat full path
let getFullPath = (_path) => require("@/" + _path + ".graphql");

export { mutation };

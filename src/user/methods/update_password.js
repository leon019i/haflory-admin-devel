import { mutation } from "@/core/methods/mutation";

const updatePassword = (currentPassword, password) => {
  let responseFromApi;

  let variables = {
    currentPassword: currentPassword,
    newPassword: password,
  };

  let mutaionPath = "user/api/mutations/update_password";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "sellers",
    mutaion_name: "updatePassword",
    path: "user/api/queries/sellers_query", //to update query path
  };

  let isVariable = false;
  let methodName = "update";

  responseFromApi = mutation(
    variables,
    mutaionPath,
    readQueryFromStore,
    isVariable,
    methodName
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { updatePassword };

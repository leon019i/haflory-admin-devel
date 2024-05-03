import { mutation } from "@/core/methods/mutation";

const clearPayment = (_variables) => {
  let responseFromApi;

  let variables = {
    user: _variables,
  };

  // console.log("variables", variables);

  let mutaionPath = "accounts/api/mutations/clear_payment";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "accounts",
    mutaion_name: "clearPayment",
    path: "accounts/api/queries/payment_query", //to update query path
  };

  let isVariable = true;
  let methodName = "update";

  responseFromApi = mutation(
    variables,
    mutaionPath,
    readQueryFromStore,
    isVariable,
    methodName
  )
    .then((data) => {
      // console.log("create", data);

      return data;
    })
    .catch((error) => {
      console.log("error", error);

      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { clearPayment };

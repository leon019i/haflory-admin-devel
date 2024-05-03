import { mutation } from "@/core/methods/mutation";

const unAssignDriver = (_id, limitSkip) => {
  let responseFromApi;

  let variables = {
    id: _id,
  };

  // console.log(limitSkip);

  let mutaionPath = "user/api/mutations/unassign_driver";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "orders",
    mutaion_name: "unAssignDriver",
    path: "orders/api/queries/orders_query", //to update query path
  };

  let isVariable = true;

  let methodName = "update";

  responseFromApi = mutation(
    variables,
    mutaionPath,
    readQueryFromStore,
    isVariable,
    methodName,
    limitSkip
  )
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { unAssignDriver };

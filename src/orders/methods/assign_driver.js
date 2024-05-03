import { mutation } from "@/core/methods/mutation";

const assignDriverToOrder = (_variables) => {
  let responseFromApi;

  let variables = {
    order: _variables.order,
    driver: _variables.driver,
  };

  // console.log(">>>>",variables);
  let mutaionPath = "orders/api/mutations/assign_driver";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "orders",
    mutaion_name: "assignDriverToOrder",
    path: "orders/api/queries/orders_query", //to update query path
  };

  let isVariable = true;
  let methodName = "update";
  // console.log(">>>>");

  responseFromApi = mutation(
    variables,
    mutaionPath,
    readQueryFromStore,
    isVariable,
    methodName
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

export { assignDriverToOrder };

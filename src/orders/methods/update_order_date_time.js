import { mutation } from "@/core/methods/mutation";

const updateOrderDateAndTime = (_id, date, time) => {
  let responseFromApi;

  let variables = {
    id: _id,
    date: date,
    time: time,
  };

  // console.log(">>>>",variables);
  let mutaionPath = "orders/api/mutations/update_order_date_time";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "orders",
    mutaion_name: "updateOrderDateAndTime",
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
      // console.log("data")
      // console.log(data)
      return data;
    })
    .catch((error) => {
      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { updateOrderDateAndTime };

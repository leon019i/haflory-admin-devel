import { mutation } from "@/core/methods/mutation";

const markAsRead = (_id) => {
  let responseFromApi;

  let variables = {
    customer: _id,
  };

  // console.log(variables);

  let mutaionPath = "chat/api/mutations/mark_as_read";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "getChatCustomer",
    mutaion_name: "markAsRead",
    path: "chat/api/queries/customer_name_query", //to update query path
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
      // console.log("mark as read", data);
      return data;
    })
    .catch((error) => {
      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { markAsRead };

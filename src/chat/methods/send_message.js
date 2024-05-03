import { mutation } from "@/core/methods/mutation";

const sendMessage = (_variables, limitSkip) => {
  let responseFromApi;

  let variables = {
    customer: _variables.customer,
    customerName: _variables.customerName,
    date: _variables.date,
    message: _variables.messages,
  };

  let mutaionPath = "chat/api/mutations/send_message";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "chatList",
    mutaion_name: "sendMessage",
    path: "chat/api/queries/chat_list_query", //to update query path
  };

  // console.log("variables", variables);
  // console.log("limitSkip", limitSkip);

  let isVariable = true;

  let methodName = "create";

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
      console.log(error);

      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { sendMessage };

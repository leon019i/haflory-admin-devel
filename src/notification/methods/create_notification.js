import { mutation } from "@/core/methods/mutation";

const createNotification = (_title, _message) => {
  let responseFromApi;

  let variables = {
    title: _title,
    body: _message,
  };

  // console.log("variables", variables);

  let mutaionPath = "notification/api/mutations/create_notification";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "notifications",
    mutaion_name: "createNotification",
    path: "notification/api/queries/notifcations_query", //to update query path
  };

  let isVariable = true;
  let methodName = "create";

  responseFromApi = mutation(
    variables,
    mutaionPath,
    readQueryFromStore,
    isVariable,
    methodName
  )
    .then((data) => {
      // console.log("create notify", data);

      return data;
    })
    .catch((error) => {
      console.log("error", error);

      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { createNotification };

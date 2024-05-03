import { mutation } from "../../core/methods/mutation";

const subscribeChatNotification = (token) => {
  const variables = {
    token: token,
  };

  const mutaionPath = "chat/api/mutations/subscribe_chat_notification";

  // This is to read cache data and update
  let readQueryFromStore = {
    mutaion_name: "subscribeChatNotification",
  };

  return mutation(variables, mutaionPath, readQueryFromStore)
    .then((data) => {
      // console.log("subscribeChatNotification:Data:", data);
      return data;
    })
    .catch((error) => {
      return JSON.stringify(error.message);
    });
};

export { subscribeChatNotification };

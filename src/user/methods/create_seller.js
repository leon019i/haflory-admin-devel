import { mutation } from "@/core/methods/mutation";

const createDriver = (_variables) => {
  let responseFromApi;

  let variables = {
    nameEn: _variables.nameEn,
    nameAr: _variables.nameEn,
    email: _variables.email,
    password: _variables.password,
    phone: _variables.phone,
    avatar: _variables.avatar,
    active: _variables.active,
  };

  let mutaionPath = "user/api/mutations/create_seller";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "drivers",
    mutaion_name: "createDriver",
    path: "user/api/queries/sellers_query", //to update query path
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
      // console.log(">>>", data);
      return data;
    })
    .catch((error) => {
      console.log(error);

      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { createDriver };

import { mutation } from "@/core/methods/mutation";

const createService = (_variables) => {
  let responseFromApi;

  let subServices = [];
  _variables.subservices.forEach((element) => {
    subServices.push({
      nameEn: element.nameEn,
      nameAr: element.nameAr,
      avatar: element.avatar,
      price: parseFloat(_variables.price),
      commission: parseFloat(_variables.commission),
    });
  });

  let variables = {
    nameEn: _variables.nameEn,
    nameAr: _variables.nameAr,
    descriptionEn: _variables.descriptionEn,
    descriptionAr: _variables.descriptionAr,
    order: parseInt(_variables.order),
    active: _variables.active,
    avatar: _variables.avatar,
    price: parseFloat(_variables.price),
    commission: parseFloat(_variables.commission),
    subServices: subServices,
  };

  // console.log("variables", variables);

  let mutaionPath = "services/api/mutations/create_service";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "services",
    mutaion_name: "createService",
    path: "services/api/queries/services_query", //to update query path
  };

  let isVariable = false;
  let methodName = "create";

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
      // console.log(">>>>>>>>>>>>>>>");
      console.log("error", error);

      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { createService };

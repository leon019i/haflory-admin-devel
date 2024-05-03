import { mutation } from "@/core/methods/mutation";

const updateService = (_variables) => {
  let responseFromApi;

  // console.log("update cateory", _variables);

  let subServices = [];
  _variables.subServices.forEach((element) => {
    subServices.push({
      _id: element._id,
      nameEn: element.nameEn,
      nameAr: element.nameAr,
      avatar: element.avatar,
      price: parseFloat(element.price),
      commission: parseFloat(element.commission),
    });
  });

  let variables = {
    id: _variables.id,
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

  // console.log("update cateory", variables);

  let mutaionPath = "services/api/mutations/update_service";

  // This is to read cache data and update
  let readQueryFromStore = {
    query_name: "services",
    mutaion_name: "updateService",
    path: "services/api/queries/services_query", //to update query path
  };

  let isVariable = false;
  let methodName = "update";

  responseFromApi = mutation(
    variables,
    mutaionPath,
    readQueryFromStore,
    isVariable,
    methodName
  )
    .then((data) => {
      // console.log("update category", data)
      return data;
    })
    .catch((error) => {
      console.log("error", error);

      return JSON.stringify(error.message);
    });
  return responseFromApi;
};

export { updateService };

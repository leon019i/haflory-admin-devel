const updateClientCache = async (
  store,
  _data,
  _var,
  isVariables,
  methodName,
  _variables,
  limitSkip
) => {
  let fullPath = getFullPath(_var.path);

  let variables = getVariables(_var.mutaion_name);

  const query = {
    query: fullPath,
    // variables: isVariables ? variables : null
    variables: isVariables ? limitSkip ?? variables : null,
  };

  // read old data from store
  const data = store.readQuery(query);

  // console.log("query data", data);

  if (methodName == "create") {
    //push new data to store
    if (
      _var.mutaion_name == "createProduct" ||
      _var.mutaion_name == "sendMessage" ||
      _var.mutaion_name == "createDriver" ||
      _var.mutaion_name == "addPayment" ||
      _var.mutaion_name == "createGovernorateTransferPrice" ||
      _var.mutaion_name == "createGovernorateAreaTransferPrice" ||
      _var.mutaion_name == "createAreaTransferPrice"
    ) {
      if (_var.mutaion_name == "addPayment") {
        const index = data[_var.query_name]["transaction"].push(
          _data[_var.mutaion_name]
        );
        let currentIndex = data[_var.query_name]["payment"].findIndex(
          (t) => t.user._id === _variables.user
        );
        data[_var.query_name]["payment"][currentIndex]["paidAmount"] =
          data[_var.query_name]["payment"][currentIndex]["paidAmount"] +
          _data[_var.mutaion_name]["amount"];
      } else if (_var.mutaion_name == "createDriver") {
        const index = data[_var.query_name]["user"].push(
          _data[_var.mutaion_name]
        );
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] + 1;
      } else if (_var.mutaion_name == "createGovernorateTransferPrice") {
        const index = data[_var.query_name]["governoratePrice"].push(
          _data[_var.mutaion_name]
        );
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] + 1;
      } else if (_var.mutaion_name == "createGovernorateAreaTransferPrice") {
        const index = data[_var.query_name]["governorateAreaPrice"].push(
          _data[_var.mutaion_name]
        );
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] + 1;
      } else if (_var.mutaion_name == "createAreaTransferPrice") {
        const index = data[_var.query_name]["areaPrice"].push(
          _data[_var.mutaion_name]
        );
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] + 1;
      }

      //// send message
      else if (_var.mutaion_name == "sendMessage") {
        // console.log("mutaion", _data[_var.mutaion_name]);
        let currentIndex = data[_var.query_name]["chats"].findIndex(
          (t) => t._id === _data[_var.mutaion_name]._id
        );
        // console.log("current Index", currentIndex);

        if (currentIndex != -1) {
          data[_var.query_name]["chats"][currentIndex]["messages"].push(
            _data[_var.mutaion_name]["message"]
          );
        } else {
          let newMessage = {
            _id: _data[_var.mutaion_name]._id,
            customer: _data[_var.mutaion_name].customer,
            customerName: _data[_var.mutaion_name].customerName,
            date: _data[_var.mutaion_name].date,
            messages: [_data[_var.mutaion_name].message],
          };

          data[_var.query_name]["chats"].push(newMessage);
        }
      } else {
        const index = data[_var.query_name][_var.query_name].push(
          _data[_var.mutaion_name]
        );
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] + 1;
      }
    } else {
      const index = data[_var.query_name].push(_data[_var.mutaion_name]);
    }
  } else if (methodName == "update") {
    //update new data to store
    if (
      _var.mutaion_name == "updateGovernorateTransferPrice" ||
      _var.mutaion_name == "updateAreaTransferPrice" ||
      _var.mutaion_name == "updateGovernorateAreaTransferPrice" ||
      _var.mutaion_name == "updateDriver" ||
      _var.mutaion_name == "updateOrderDateAndTime" ||
      _var.mutaion_name == "assignDriverToOrder" ||
      _var.mutaion_name == "updateProductStatus" ||
      _var.mutaion_name == "unAssignDriver" ||
      _var.mutaion_name == "markAsRead"
    ) {
      if (_var.query_name == "pendingApprovalList") {
        let currentIndex = data[_var.query_name]["products"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["products"][currentIndex] =
          _data[_var.mutaion_name];
      } else if (_var.mutaion_name == "updateDriver") {
        let currentIndex = data[_var.query_name]["user"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["user"][currentIndex] = _data[_var.mutaion_name];
      }

      //mark as read
      else if (_var.mutaion_name == "markAsRead") {
        // console.log(_data[_var.mutaion_name]);
        let currentIndex = data[_var.query_name].findIndex(
          (t) => t.customer === _data[_var.mutaion_name].customer
        );
        // console.log(currentIndex);
        data[_var.query_name][currentIndex] = _data[_var.mutaion_name];
      } else if (_var.mutaion_name == "unAssignDriver") {
        let currentIndex = data[_var.query_name]["orders"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["orders"][currentIndex] =
          _data[_var.mutaion_name];
      } else if (_var.mutaion_name == "updateGovernorateTransferPrice") {
        let currentIndex = data[_var.query_name]["governoratePrice"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["governoratePrice"][currentIndex] =
          _data[_var.mutaion_name];
      } else if (_var.mutaion_name == "updateGovernorateAreaTransferPrice") {
        let currentIndex = data[_var.query_name][
          "governorateAreaPrice"
        ].findIndex((t) => t._id === _variables.id);
        data[_var.query_name]["governorateAreaPrice"][currentIndex] =
          _data[_var.mutaion_name];
      } else if (_var.mutaion_name == "updateAreaTransferPrice") {
        let currentIndex = data[_var.query_name]["areaPrice"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["areaPrice"][currentIndex] =
          _data[_var.mutaion_name];
      } else {
        let currentIndex = data[_var.query_name][_var.query_name].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name][_var.query_name][currentIndex] =
          _data[_var.mutaion_name];
      }
    } else if (_var.mutaion_name == "changeApprovalStatus") {
      let currentIndex = data[_var.query_name]["products"].findIndex(
        (t) => t._id === _variables.id
      );
      data[_var.query_name]["products"][currentIndex] =
        _data[_var.mutaion_name];
    } else {
      let currentIndex = data[_var.query_name].findIndex(
        (t) => t._id === _variables.id
      );
      data[_var.query_name][currentIndex] = _data[_var.mutaion_name];
    }
  } else {
    //delete data from store
    if (
      _var.mutaion_name == "deleteGovernorateTransferPrice" ||
      _var.mutaion_name == "deleteGovernorateAreaTransferPrice" ||
      _var.mutaion_name == "deleteAreaTransferPrice" ||
      _var.mutaion_name == "deleteDriver"
    ) {
      if (_var.query_name == "pendingApprovalList") {
        let currentIndex = data[_var.query_name]["products"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["products"].splice(currentIndex, 1);
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] - 1;
      } else if (_var.mutaion_name == "deleteDriver") {
        let currentIndex = data[_var.query_name]["user"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["user"].splice(currentIndex, 1);
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] - 1;
      } else if (_var.mutaion_name == "deleteGovernorateTransferPrice") {
        let currentIndex = data[_var.query_name]["governoratePrice"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["governoratePrice"].splice(currentIndex, 1);
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] - 1;
      } else if (_var.mutaion_name == "deleteGovernorateAreaTransferPrice") {
        let currentIndex = data[_var.query_name][
          "governorateAreaPrice"
        ].findIndex((t) => t._id === _variables.id);
        data[_var.query_name]["governorateAreaPrice"].splice(currentIndex, 1);
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] - 1;
      } else if (_var.mutaion_name == "deleteAreaTransferPrice") {
        let currentIndex = data[_var.query_name]["areaPrice"].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name]["areaPrice"].splice(currentIndex, 1);
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] - 1;
      } else {
        let currentIndex = data[_var.query_name][_var.query_name].findIndex(
          (t) => t._id === _variables.id
        );
        data[_var.query_name][_var.query_name].splice(currentIndex, 1);
        data[_var.query_name]["totalCount"] =
          data[_var.query_name]["totalCount"] - 1;
      }
    } else {
      let currentIndex = data[_var.query_name].findIndex(
        (t) => t._id === _variables.id
      );
      data[_var.query_name].splice(currentIndex, 1);
    }
  }

  //update data to store
  store.writeQuery({ ...query, data });
};

//concat full path
let getFullPath = (_path) => require("@/" + _path + ".graphql");

let getVariables = (v) => {
  if (
    v === "createDriver" ||
    v === "clearPayment" ||
    v === "deleteSeller" ||
    v === "updateSellerStatus" ||
    v === "deleteProduct" ||
    v === "createAreaTransferPrice" ||
    v === "createGovernorateTransferPrice" ||
    v === "createGovernorateAreaTransferPrice" ||
    v === "updateProductStatus" ||
    v === "updateProductFeatured" ||
    v === "updateGovernorateTransferPrice" ||
    v === "updateAreaTransferPrice" ||
    v === "updateGovernorateAreaTransferPrice" ||
    v === "updateOrderDateAndTime" ||
    v === "assignDriverToOrder" ||
    v === "changeApprovalStatus" ||
    v === "pendingOrders"
  ) {
    return (v = {
      limit: 10,
      skip: 0,
    });
  } else if (v === "addPayment" || v === "markAsRead") {
    return (v = {
      limit: 0,
      skip: 0,
    });
  }
};
export { updateClientCache };

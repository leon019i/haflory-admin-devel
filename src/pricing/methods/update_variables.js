import { mutation } from '@/core/methods/mutation';

const updateVariables = (_variables) => {
    let responseFromApi;

    let variables = {

        floorLimit: parseInt(_variables.floorLimit),
        floorPrice: parseFloat(_variables.floorPrice)

    };

    // console.log(variables);

    let mutaionPath = 'pricing/api/mutations/update_variables';

    // This is to read cache data and update
    let readQueryFromStore = {
        query_name: 'getPriceVariable',
        mutaion_name: 'updateVariables',
        path: 'pricing/api/queries/variables_query' //to update query path
    };

    let isVariable = false;
    let methodName = 'update';

    responseFromApi = mutation(variables, mutaionPath, readQueryFromStore, isVariable, methodName)
        .then((data) => {
            // console.log(data);
            return data;
        })
        .catch((error) => {
            return JSON.stringify(error.message);
        });
    return responseFromApi;
};

export { updateVariables };

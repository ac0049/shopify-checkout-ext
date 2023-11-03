// @ts-check
// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").Operation} Operation
*/
// The @shopify/shopify_function package will use the default export as your function entrypoint
const NO_CHANGES = {
  operations: [],
};
export default
/**
* @param {InputQuery} input
* @returns {FunctionResult}
*/
(input) => {

  const deliveryOptions = input.cart.deliveryGroups.filter(item => {
      return item.deliveryOptions.some((option) => option.deliveryMethodType == "PICK_UP")
  });

  console.log('language', input.localization.language.isoCode)
  console.log('Country', input.localization.country.isoCode)

  if(deliveryOptions.length == 0 || input.localization.language.isoCode == 'SL') {
      console.error("No Pickup delivery method found");
      return NO_CHANGES;
  }

  const deliveryHandle = deliveryOptions[0].deliveryOptions[0].handle;

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [{
        hide: {
            deliveryOptionHandle: deliveryHandle
        }
    }]
  };
};
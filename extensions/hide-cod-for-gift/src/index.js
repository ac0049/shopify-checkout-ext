// @ts-check
// Use JSDoc annotations for type safety
/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").HideOperation} HideOperation
*/
/**
* @type {FunctionResult}
*/
const NO_CHANGES = {
  operations: [],
};
// The @shopify/shopify_function package will use the default export as your function entrypoint
export default /**
    * @param {InputQuery} input
    * @returns {FunctionResult}
    */
  (input) => {
    const cartLines = input.cart.lines,
          countryCode = input.localization.country.isoCode,
          availableCountries = ['SI','IT','HR'];
    console.log('delivery', input.cart.deliveryGroups);
    console.log('countrycode', countryCode);
    const isGift = cartLines.filter(line => line.merchandise.product.isGiftCard).length;

    const hidePaymentMethod = input.paymentMethods
      .find(method => method.name.includes("Cash on Delivery"));

    if (!hidePaymentMethod) {
      console.error("No payment method found");
      return NO_CHANGES;
    }

    if(!availableCountries.includes(countryCode)) {
      return {
        operations: [{
          hide: {
            paymentMethodId: hidePaymentMethod.id
          }
        }]
      };  
    }
    
    if(isGift == 0) {
      console.log('No gift card');
      return NO_CHANGES;
    }
    
    // The @shopify/shopify_function package applies JSON.stringify() to your function result
    // and writes it to STDOUT
    return {
      operations: [{
        hide: {
          paymentMethodId: hidePaymentMethod.id
        }
      }]
    };
  };
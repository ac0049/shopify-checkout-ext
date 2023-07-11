import React, {useState, useEffect} from 'react';
import {
  render,
  Banner,
  useApplyCartLinesChange,
  useSelectedPaymentOptions,
  useCartLines,
  useLocalizationCountry
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const cartLines = useCartLines(),
        addProductLine = useApplyCartLinesChange(),
        country = useLocalizationCountry();
  const paymentOptions = useSelectedPaymentOptions();
  let feeId = "gid://shopify/ProductVariant/";
  if(country.isoCode == "SL")
    feeId += "45546242736423"
  else if(country.isoCode == "IT")
    feeId += "45546242769191"
  else {
    feeId += "45546242801959"
  }

  useEffect(async () => {
    if(paymentOptions[0].type == "paymentOnDelivery") {
      if(cartLines.filter((line) => line.merchandise.id == feeId).length == 0) {
        await addProductLine({
          type: 'addCartLine',
          merchandiseId: feeId,
          quantity: 1
        });
      } else {
        const feedLineItem = cartLines.filter((line) => line.merchandise.id == feeId);
        await addProductLine({
          type: 'removeCartLine',
          id: feedLineItem.id,
          quantity: 1
        });
      }
    } else {
      if(cartLines.filter((line) => line.merchandise.id == feeId).length != 0) {
        const feedLineItem = cartLines.filter((line) => line.merchandise.id == feeId)[0];
        await addProductLine({
          type: 'removeCartLine',
          id: feedLineItem.id,
          quantity: 1
        });
      }
    }
  });

  return (
    <></>
  );
}
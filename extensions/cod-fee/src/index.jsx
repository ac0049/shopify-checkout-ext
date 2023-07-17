import React, {useState, useEffect} from 'react';
import {
  render,
  useSettings,
  useApplyCartLinesChange,
  useSelectedPaymentOptions,
  useCartLines,
  useLocalizationCountry
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {fee_product_sl, fee_product_it, fee_product_hr} = useSettings();
  const addProductLine = useApplyCartLinesChange();
  const paymentOptions = useSelectedPaymentOptions();
  const cartLines = useCartLines();
  const country = useLocalizationCountry();
  let feeId = "";
  if(country.isoCode == "SL")
    feeId = fee_product_sl;
  else if(country.isoCode == "IT")
    feeId = fee_product_it;
  else {
    feeId = fee_product_hr;
  }
  useEffect(async () => {
    if(paymentOptions[0].type == "paymentOnDelivery") {
      if(cartLines.filter((line) => line.merchandise.id == feeId).length == 0) {
        try {
          await addProductLine({
            type: 'addCartLine',
            merchandiseId: feeId,
            quantity: 1
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        const feedLineItem = cartLines.filter((line) => line.merchandise.id == feeId);
        try {
          await addProductLine({
            type: 'removeCartLine',
            id: feedLineItem.id,
            quantity: 1
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      if(cartLines.filter((line) => line.merchandise.id == feeId).length != 0) {
        const feedLineItem = cartLines.filter((line) => line.merchandise.id == feeId)[0];
        try {
          await addProductLine({
            type: 'removeCartLine',
            id: feedLineItem.id,
            quantity: 1
          });
        } catch (error) {
          console.log(error);
        }        
      }
    }
  });

  return (
    <></>
  );
}
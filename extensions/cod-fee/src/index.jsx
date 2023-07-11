import React, {useState, useEffect} from 'react';
import {
  render,
  Banner,
  useApplyCartLinesChange,
  useSelectedPaymentOptions,
  useCartLines
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const cartLines = useCartLines();
  const addProductLine = useApplyCartLinesChange();
  const paymentOptions = useSelectedPaymentOptions();
  const feeId = "gid://shopify/ProductVariant/45529564479783";

  useEffect(async () => {
    // if(paymentOptions[0].type == "paymentOnDelivery") {
    //   if(cartLines.filter((line) => line.merchandise.id == feeId).length == 0) {
    //     await addProductLine({
    //       type: 'addCartLine',
    //       merchandiseId: feeId,
    //       quantity: 1
    //     });
    //   } else {
    //     const feedLineItem = cartLines.filter((line) => line.merchandise.id == feeId);
    //     await addProductLine({
    //       type: 'removeCartLine',
    //       id: feedLineItem.id,
    //       quantity: 1
    //     });
    //   }
    // } else {
    //   if(cartLines.filter((line) => line.merchandise.id == feeId).length != 0) {
    //     const feedLineItem = cartLines.filter((line) => line.merchandise.id == feeId)[0];
    //     await addProductLine({
    //       type: 'removeCartLine',
    //       id: feedLineItem.id,
    //       quantity: 1
    //     });
    //   }
    // }
  });

  return (
    <></>
  );
}
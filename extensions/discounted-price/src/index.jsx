import React from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::CartLineDetails::RenderLineComponents', () => <App />);

function App() {
  const {extensionPoint} = useExtensionApi();
  const translate = useTranslate();
  return (
    <Banner title="discounted-price">
      {translate('welcome', {extensionPoint})}
    </Banner>
  );
}
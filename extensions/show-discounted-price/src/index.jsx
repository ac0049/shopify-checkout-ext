import React, {useEffect, useState} from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useCartLines
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const cartLines = useCartLines();
  console.log(cartLines[0].merchandise.product.id);
  const {query} = useExtensionApi();
  const [data, setData] = useState();

  useEffect(() => {
    query(`
      query getProductById($id: ID!) {
        product(id: $id) {
          title,
           variants(first:10){
            nodes{
              id,
              compareAtPrice {
                amount
              },
              price {
                amount
              }
            }
          }
        }
      }`,
      {
       variables: {id: cartLines[0].merchandise.product.id} 
      }
    )
      .then(({data, errors}) => {
        console.log(errors);
        setData(data);
      })
      .catch(console.error);
  }, [query]);

  console.log(data);
  
  return (
    <Banner title="show-discounted-price">
    </Banner>
  );
}
import Products from "@/components/views/Products";

const fetchProductsData = async () => {
  try {
    const response = await fetch('https://4de724-2.myshopify.com/api/2023-07/graphql.json', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "X-Shopify-Storefront-Access-Token": `800caddaa4cde8b7a2fa3a4606ffdba2`
      },
      body: JSON.stringify({
        query: `
          {
            products(first: 25) {
              edges {
                node {
                  productType
                  variants(first: 250) {
                    edges {
                      node {
                        id
                        title
                        image {
                          url
                        }
                        price {
                          amount
                          currencyCode
                        }
                        availableForSale
                        sku
                        quantityAvailable
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                  handle
                  images(first: 3) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                  id
                  title
                  description
                }
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { error: 'An error occurred while fetching products' };
  }
};

export default async function Home() {
  let res = await fetchProductsData();
  return (
    <div>
      <Products products={res.data.products.edges} />
    </div>
  )
}

import { cookies } from "next/headers"

const Products = ({ products }: any) => {
    async function handleAddCart(merchandiseId: string) {
        console.log(merchandiseId)
        try {
            const response = await fetch('https://4de724-2.myshopify.com/api/2023-07/graphql.json', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    "X-Shopify-Storefront-Access-Token": `800caddaa4cde8b7a2fa3a4606ffdba2`
                },
                body: JSON.stringify({
                    query: `
                    mutation CreateCart($merchandiseId: ID!) {
                      cartCreate(
                        input: {
                          lines: [
                            {
                              quantity: 1
                              merchandiseId: $merchandiseId
                            },
                          ],
                        }
                      ) {
                        cart {
                          id
                          createdAt
                          updatedAt
                          lines(first: 10) {
                            edges {
                              node {
                                id
                                merchandise {
                                  ... on ProductVariant {
                                    id
                                  }
                                }
                              }
                            }
                          }
                          buyerIdentity {
                            deliveryAddressPreferences {
                              __typename
                            }
                          }
                          attributes {
                            key
                            value
                          }
                          cost {
                            totalAmount {
                              amount
                              currencyCode
                            }
                            subtotalAmount {
                              amount
                              currencyCode
                            }
                            totalTaxAmount {
                              amount
                              currencyCode
                            }
                            totalDutyAmount {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  `,
                    variables: {
                        merchandiseId,
                    },
                }),
            });

            const data = await response.json();

            fetch("http://localhost:3001/api/setcart", {
                method: "POST",
                body: JSON.stringify({
                    userId: cookies().get("accessToken"),
                    cartId: data.data.cartCreate.cart.id
                })
            })
        } catch (error) {
            console.error('Error creating cart:', error);
            return { error: 'An error occurred while creating the cart' };
        }
    }
    return (
        <div className="space-y-6">
            {products.map((item: any, index: number) => (
                <form onSubmit={() => handleAddCart(item.node.variants.edges[0].node.id)} key={index} className="border-4 bg-gray-100">
                    <p>Title: {item.node.title}</p>
                    <p>Handle: {item.node.handle}</p>
                    <p>Description: {item.node.description}</p>
                    <p>Id: {item.node.id}</p>
                    <button className="border-2 shadow-md" >Add to Cart</button>
                </form>
            ))}
        </div>
    )
}

export default Products
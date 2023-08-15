import { cookies } from "next/headers"

async function userInfoGetter() {
  let graphqlEndpoint = "https://4de724-2.myshopify.com/api/2023-07/graphql.json";
  if (cookies().get("accessToken")) {
    let accessToken = cookies().get("accessToken")?.value
    const query = `
      query GetCustomer($accessToken: String!) {
        customer(customerAccessToken: $accessToken) {
          id
          firstName
          lastName
          email
        }
      }
    `;

    const variables = {
      accessToken,
    };
    let response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        "X-Shopify-Storefront-Access-Token": `800caddaa4cde8b7a2fa3a4606ffdba2`
      },
      body: JSON.stringify({
        query,
        variables
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch")
    }
    response = await response.json();
    return response
  }
  return "Value not Found"
}

const AboutPage = async () => {
  let res :any= await userInfoGetter()

  return (
    <div>
      <p>Name :   {res.data.customer.firstName + res.data.customer.lastName}</p>
      <p>Email :   {res.data.customer.email}</p>
      <p>Id :     {res.data.customer.id}</p>
    </div>
  )
}

export default AboutPage
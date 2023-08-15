"use client"
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const graphqlEndpoint = 'https://4de724-2.myshopify.com/api/2023-07/graphql.json';
        const mutation = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
                
              customerUserErrors {
                code
                field
                message
              }
              customerAccessToken {
                accessToken
                expiresAt
              }
            }
          }          
    `;

        const variables = {
            input: {
                email,
                password,
            },
        };

        try {
            const response = await fetch(graphqlEndpoint, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    "X-Shopify-Storefront-Access-Token": `800caddaa4cde8b7a2fa3a4606ffdba2`
                },
                body: JSON.stringify({
                    query: mutation,
                    variables,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch")
            }

            const { data } = await response.json();
            if (data && typeof window !== undefined) {
                let res = await fetch("/api/settercook", {
                    method: "POST",
                    body: JSON.stringify({
                        token: data.customerAccessTokenCreate.customerAccessToken.accessToken
                    })
                })
                console.log(res.ok)
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-sm p-6 rounded-lg shadow-md bg-white">
                <h2 className="text-2xl mb-4">Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
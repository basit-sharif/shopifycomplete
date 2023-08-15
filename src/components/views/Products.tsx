
const Products = ({ products }: any) => {
    async function handleAddCart(productId: string) {

    }
    return (
        <div className="space-y-6">
            {products.map((item: any, index: number) => (
                <div key={index} className="border-4 bg-gray-100">
                    <p>Title: {item.node.title}</p>
                    <p>Handle: {item.node.handle}</p>
                    <p>Description: {item.node.description}</p>
                    <p>Id: {item.node.id}</p>
                    <button className="border-2 shadow-md" onClick={handleAddCart}>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}

export default Products
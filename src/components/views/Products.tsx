
const Products = ({ products }: any) => {
    function handleAddCart(productId: string) {
        console.log("how are you")
    }
    return (
        <div className="space-y-6">
            {products.map((item: any, index: number) => (
                <div key={index} className="border-4 bg-gray-100">
                    <p>Title: {item.node.title}</p>
                    <p>Handle: {item.node.handle}</p>
                    <p>Description: {item.node.description}</p>
                    <p>Id: {item.node.id}</p>
                    <button className="border-2 shadow-md" onClick={() => handleAddCart(item.node.id)} >Add to Cart</button>
                </div>
            ))}
        </div>
    )
}

export default Products
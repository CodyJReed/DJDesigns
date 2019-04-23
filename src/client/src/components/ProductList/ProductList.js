import React, {useState, useEffect} from "react";
import axios from "axios"
import {Base64} from "js-base64"

const ProductList = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:5000/items")
        setProducts(response.data)
    }

     useEffect(() => {
        fetchProducts()
     }, [])

    const items = products.map(item => {
        let image = Base64.atob(item.image.data)
        console.log(image)
            return (
            <div>
                <img src={`data:image/jpg;base64,${image}`} alt={item.name}/>
                <h1 key={item._id}>{item.name}</h1>
                <p>{item.description}</p>
                <p>{item.stock}</p>
                <p>${item.price}</p>
            </div>
            )
        })

        return <div>{items}</div>
    }

export default ProductList
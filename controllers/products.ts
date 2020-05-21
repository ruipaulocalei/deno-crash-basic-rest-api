import { Product } from "../types.ts"
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

let products: Product[] = [
    {
        id: "1",
        name: "Product One",
        description: "This is Product one",
        price: 1000
    },
    {
        id: "2",
        name: "Product Two",
        description: "This is Product two",
        price: 3000
    },
    {
        id: "3",
        name: "Product Three",
        description: "This is Product three",
        price: 1500
    },
    {
        id: "4",
        name: "Product Four",
        description: "This is Product four",
        price: 2700
    },
]

//Get all products
//GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

//Get single product
//GET /api/v1/product/:id
const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id);
    if (product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404,
            response.body = {
                success: false,
                msg: 'No product found'
            }
    }
}

//Add product
//POST /api/v1/product
const addProduct = async ({request, response }: {request: any, response: any }) => {
const body = await request.body()
if (!request.hasBody) {
    response.status = 400,
    response.body = {
        success: false,
        msg: 'No data'
    }
} else {
    const product: Product = body.value
    product.id = v4.generate()
    products.push(product)
    response.status = 201,
    response.body = {
        success: true,
        data: product
    }
}
}

//Update product
//PUT /api/v1/product/:id
const updateProduct = async ({params, request, response }: {params: {id: string}, request: any, response: any }) => {
   const product: Product | undefined = products.find(p => p.id === params.id)
   if (product) {
       const body = await request.body()
       const updateData: {name?: string, description?: string, price?: number} = body.value
       products = products.map(p => p.id === params.id ? {...p, ...updateData} : p)
       response.status = 200
       response.body = {
           success: true,
           data: products
       }
   } else {
       response.status = 404
       response.body = {
           success: false,
           msg: 'Not found'
       }
   }
}

//Delete product
//DELETE /api/v1/product:id
const deleteProduct = ({params, response }: {params: {id:string}, response: any }) => {
   products = products.filter(p => p.id !== params.id)
   response.body = {
       success: true,
       msg: 'product removed'
   }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }
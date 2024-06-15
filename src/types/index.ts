export type Guitar = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
}

// herencia de tipos
export type CartItem = Guitar & {
    quantity: number
}

export type GuitarID = Guitar['id']
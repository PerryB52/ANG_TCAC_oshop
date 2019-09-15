import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
        //in order to make sure the itemsMap field is initialized properly
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            this.items.push(new ShoppingCartItem({
                // title: item.title,
                // imageUrl: item.imageUrl,
                // price: item.price,
                ...item, //this line is equivalent to the above 3 lines, typescript object spread operator.
                $key: productId
            }));
        }

     }

    getQuantity(product: Product) {
        console.log("product: ", product)
        let item = this.itemsMap[product.$key]
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice

        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity

        return count;
    }
}
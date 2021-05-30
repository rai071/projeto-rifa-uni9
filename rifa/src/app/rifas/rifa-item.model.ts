import { RifaCartItem } from './rifas-cart/cart-item-model';

export class RifaItem {
    constructor(public rifaItem: RifaCartItem, public quantity: number = 1) { }

    value(): number {
        return this.quantity * this.quantity;
    }
}

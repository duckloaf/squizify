import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SquizifyService } from '../app.service';
import { Product } from '../classes/product';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    constructor(
        public api: SquizifyService,
        public router: Router,
    ) { }

    ngOnInit(): void {
    }

    // Calculate the price of the tea plus any selected bubbles
    calculateItemTotal(product: Product): number {
        let total = product.price;
        product.bubbles.forEach((bubble) => {
            total += bubble.price;
        });
        return total;
    }

    // Calculate the total tea cost (including bubbles) times the quantity
    calculateLineTotal(product: Product): number {
        if(product.quantity > 0) {
            return this.calculateItemTotal(product) * product.quantity;
        } else {
            // If for some reason the quantity is not a positive integer, set it to 1
            product.quantity = 1;
            return this.calculateItemTotal(product);
        }
    }

    // Calculate the total order price (all teas and bubbles and quantities)
    calculateOrderTotal(): number {
        let order_total = 0;
        this.api.cart.forEach((product) => {
            order_total += this.calculateLineTotal(product);
        });
        return order_total;
    }

    removeProductFromCart(product: Product): void {
        this.api.removeProductFromCart(product);
    }

    processOrder(): void {
        // Do nothing if there are no products in the cart
        if(this.api.cart.length > 0) {
            // Write the order to the DB
            this.api.addOrder();
            // Show result of payment processing
            this.router.navigateByUrl('/thanks');
        }
    }

}

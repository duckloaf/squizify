import { Component, OnInit } from '@angular/core';
import { SquizifyService } from '../app.service';
import { Product } from './../classes/product';
import { Bubble } from '../classes/bubble';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[];
    bubbles: Bubble[];
    selected_product: Product;

    constructor(
        public api: SquizifyService
    ) { }

    ngOnInit(): void {
        // On launch, retrieve the list of products and bubbles from the local "database" files.
        // This data will be written back to the service in variables that can be manipulated by the program.
        this.getProducts();
        this.getBubbles();
    }

    getProducts(): void {
        this.api.getProducts().subscribe(
            data => { 
                this.products = data;
                this.api.products = data;
            },
            err => { 
                console.error(err.status);
            }
        );
    }

    getBubbles(): void {
        this.api.getBubbles().subscribe(
            data => { 
                this.bubbles = data;
                this.api.bubbles = data;
            },
            err => { 
                console.error(err.status);
            }
        );
    }

    selectProduct(drink: Product): void {
        this.selected_product = {...drink};
    }

    resetBubbles(): void {
        this.bubbles.forEach((bubble) => {
            bubble.selected = false;
        });
        this.products.forEach((prod) => {
            prod.bubbles = [];
        });
    }

    addToCart(): void {
        // Add all selected bubbles to the selected product
        this.bubbles.forEach((bubble) => {
            if(bubble.selected) {
                this.selected_product.bubbles.push(bubble);
            }
        });
        // Make all bubbles unselected, ready for the next order
        this.resetBubbles();
        // By default, a quantity of 1 product is added to the cart 
        this.selected_product.quantity = 1;
        // Add the product to the cart
        this.api.addProductToCart(this.selected_product);
        // Reset the selected_product variable, ready for the next order
        this.selected_product = new Product;
    }

}

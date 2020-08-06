import { Component, OnInit } from '@angular/core';
import { SquizifyService } from '../app.service';
import { Product } from './../classes/product';
import { Bubble } from '../classes/bubble';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    products: Product[];
    bubbles: Bubble[];
    selected_product: Product;
    selected_bubble: Bubble;

    constructor(
        public api: SquizifyService
    ) { }

    ngOnInit(): void {
        this.getProducts();
        this.getBubbles();
    }

    getProducts(): void {
        this.api.getProducts().subscribe(
            data => { 
                this.products = data;
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
            },
            err => { 
                console.error(err.status);
            }
        );
    }

    selectProduct(drink: Product): void {
        this.selected_product = drink;
    }

    createNewProduct(): void {
        this.selected_product = new Product;
    }

    saveProduct(): void {
        // Do nothing if editing an existing product, because the product list is stored in memory
        // and Angular alters the object directly.
        //
        // If the product doesn't have an ID, then it is a new product that needs to be added to the in-memory product list.
        if(!this.selected_product.ID) {
            // Mock a database ID value
            this.selected_product.ID = Math.floor(Math.random() * 101);
            // Mock the other default values
            this.selected_product.quantity = null;
            this.selected_product.bubbles = [];
            console.log("New product to create :", this.selected_product);
            this.api.addNewProduct(this.selected_product);
        }
    }

    selectBubble(bub: Bubble): void {
        this.selected_bubble = bub;
    }

    createNewBubble(): void {
        this.selected_bubble = new Bubble;
    }

    saveBubble(): void {
        if(!this.selected_bubble.ID) {
            // Mock a database ID value
            this.selected_bubble.ID = Math.floor(Math.random() * 101);
            // Mock the other default values
            this.selected_bubble.selected = false;
            this.api.addNewBubble(this.selected_bubble);
        }
    }

}

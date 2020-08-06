import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as DB from './app.constants';
import { Product } from './classes/product';
import { Bubble } from './classes/bubble';
import { Order } from './classes/order';

@Injectable()

export class SquizifyService {
    // Create variables that will mock data from a database
    // In real life, this data would be handled by API calls
    cart: Product[] = [];
    products: Product[];
    bubbles: Bubble[];
    order: Order;

    constructor(
        private http: HttpClient
    ) { }

    getProducts(): Observable<any> {
        // If the data hasn't been assigned yet, pull the default list from the local "DB"
        if(!this.products) {
            console.log("grabbing from file");
            return this.http.get(DB.PRODUCTS, {responseType: 'json'}).pipe();
        } else {
            console.log("sending existing variable");
            return of(this.products);
        }
        
    }

    getBubbles(): Observable<any> {
        if(!this.bubbles) {
            console.log("grabbing from file");
            return this.http.get(DB.BUBBLES, {responseType: 'json'}).pipe();
        } else {
            console.log("sending existing variable");
            return of(this.bubbles);
        }
    }

    getOrders(): Observable<any> {
        // orders will persist in local storage
        if(!localStorage.getItem(DB.ORDERS)) {
            return of([]);
        } else {
            return of(JSON.parse(localStorage.getItem(DB.ORDERS)));
        }
    }

    addOrder(): void {
        // insert the current cart contents as a new order
        let orders = [];
        if(localStorage.getItem(DB.ORDERS)) {
            orders = JSON.parse(localStorage.getItem(DB.ORDERS));
        }
        console.log("Orders BEFORE inserting :", orders);
        // Create the new order object
        let new_order = new Order;
        new_order.date = new Date().toISOString();
        // Mock the user ID
        new_order.user = 1;
        new_order.products = this.cart;

        // Add the new order and write to local storage
        orders.push(new_order);
        localStorage.setItem(DB.ORDERS, JSON.stringify(orders));

        console.log("Orders AFTER inserting :", orders);

        // empty the cart, ready for a new order
        this.cart = [];
    }

    addProductToCart(drink: Product): void {
        this.cart.push(drink);
    }

    addNewProduct(drink: Product): void {
        this.products.push(drink);
    }

    addNewBubble(bubble: Bubble): void {
        this.bubbles.push(bubble);
    }

    removeProductFromCart(drink: Product): void {
        this.cart = this.cart.filter((item) => {
            return item !== drink
        });
    }
 
}
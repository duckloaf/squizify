import { Component, OnInit } from '@angular/core';
import { Order } from '../classes/order';
import { SquizifyService } from '../app.service';
import { Leaderboard } from './../classes/leaderboard';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
    orders: Order[];
    orders_total: number = 0;
    sales_total: number = 0;
    tea_leader: Leaderboard[] = [];
    bubble_leader: Leaderboard[] = [];

    constructor(
        public api: SquizifyService
    ) { }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders(): void {
        this.api.getOrders().subscribe(
            data => { 
                this.orders = data;
                console.log(data);
                this.orders_total = this.orders.length;
                this.processSalesData();
            },
            err => { 
                console.error(err.status);
            }
        );
    }

    processSalesData(): void {
        this.orders.forEach((order) => {
            order.products.forEach((product) => {
                // Capture the total price for the tea
                this.sales_total += product.price * product.quantity;
                // Capture the quantity for the tea
                if(!this.tea_leader.find(tea => tea.name === product.name)) {
                    // If the tea isn't on the leaderboard yet, add it
                    this.tea_leader.push({name: product.name, qty: product.quantity});
                } else {
                    // If the tea is already on the leaderboard, update the quantity
                    this.tea_leader.forEach((tea) => {
                        if(tea.name === product.name) {
                            tea.qty += product.quantity;
                        }
                    });
                }
                product.bubbles.forEach((bubble) => {
                    // Capture the total price for the bubbles
                    this.sales_total += bubble.price * product.quantity;
                    // Capture the quantity for the bubbles
                    if(!this.bubble_leader.find(bub => bub.name === bubble.name)) {
                        // If the tea isn't on the leaderboard yet, add it
                        this.bubble_leader.push({name: bubble.name, qty: product.quantity});
                    } else {
                        // If the tea is already on the leaderboard, update the quantity
                        this.bubble_leader.forEach((bub) => {
                            if(bub.name === bubble.name) {
                                bub.qty += product.quantity;
                            }
                        });
                    }
                });
            });
        });

        // sort the leaderboards in descending order
        this.tea_leader.sort((a, b) => { return b.qty - a.qty });
        this.bubble_leader.sort((a, b) => { return b.qty - a.qty });
    }

}

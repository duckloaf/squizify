import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

import { StatsComponent } from './stats.component';
import { SquizifyService } from '../app.service';

describe('StatsComponent', () => {
    let component: StatsComponent;
    let fixture: ComponentFixture<StatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ StatsComponent ],
        providers: [SquizifyService],
        imports: [HttpClientTestingModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // Mock the orders Array
        component.orders = [{
            date: null, 
            user: null, 
            products: [
                {
                    ID: 1,
                    bubbles: [
                        {ID: 1, name: "Pearls", price: 1, selected: false},
                        {ID: 3, name: "Cheese Foam", price: 1, selected: false}
                    ],
                    image: "green.png",
                    name: "Green Tea",
                    price: 4,
                    quantity: 1
                },
                {
                    ID: 2,
                    bubbles: [
                        {ID: 2, name: "Aloe", price: 0.75, selected: false},
                        {ID: 1, name: "Pearls", price: 1, selected: false}
                    ],
                    image: "yellow.png",
                    name: "Pineapple Tea",
                    price: 4.5,
                    quantity: 2
                }
            ]
        }];
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly count the number of orders', () => {
        expect(component.orders.length).toBe(1);
    });

    it('should correctly count the number of products in an order', () => {
        expect(component.orders[0].products.length).toBe(2);
    });

    it('should correctly count the number of bubbles added to a product in an order', () => {
        expect(component.orders[0].products[0].bubbles.length).toBe(2);
    });

    it('should correctly calculate the total price of all orders', () => {
        component.processSalesData();
        expect(component.sales_total).toBe(18.5);
    });

    it('should show the tea with the highest sales volume at the top of the tea leaderboard', () => {
        component.processSalesData();
        expect(component.tea_leader[0].name).toBe('Pineapple Tea');
    });

    it('should correctly calculate the qty of the teas in the leaderboard', () => {
        component.processSalesData();
        expect(component.tea_leader[0].qty).toBe(2);
    });

    it('should show the bubble with the highest sales volume at the top of the bubble leaderboard', () => {
        component.processSalesData();
        expect(component.bubble_leader[0].name).toBe('Pearls');
    });

    it('should correctly calculate the qty of the bubbles in the leaderboard', () => {
        component.processSalesData();
        expect(component.bubble_leader[0].qty).toBe(3);
    });

    
});

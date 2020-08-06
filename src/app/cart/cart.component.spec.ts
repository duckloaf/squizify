import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartComponent } from './cart.component';
import { SquizifyService } from '../app.service';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ CartComponent ],
        providers: [SquizifyService],
        imports: [
            HttpClientTestingModule,
            RouterTestingModule.withRoutes([]),
        ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // Mock the cart
        component.api.cart = [
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
        ];
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly calculate the unit price of the tea plus selected bubbles', () => {
        expect(component.calculateItemTotal(component.api.cart[0])).toBe(6);
        expect(component.calculateItemTotal(component.api.cart[1])).toBe(6.25);
    });

    it('should correctly calculate the line price of the tea plus selected bubbles times the quantity', () => {
        expect(component.calculateLineTotal(component.api.cart[0])).toBe(6);
        expect(component.calculateLineTotal(component.api.cart[1])).toBe(12.50);
    });

    it('should correctly calculate the total price of the items in the cart', () => {
        expect(component.calculateOrderTotal()).toBe(18.50);
    });
});

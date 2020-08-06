import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksComponent } from './thanks.component';
import { By } from '@angular/platform-browser';

describe('ThanksComponent', () => {
    let component: ThanksComponent;
    let fixture: ComponentFixture<ThanksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ ThanksComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThanksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should load the component without errors', () => {
        expect(component).toBeTruthy();
    });

    it('should thank the user for the order', () => {
        let thanksElement = fixture.debugElement.query(By.css('#thanks'));
        expect(thanksElement).toBeTruthy();
    });

    it('should wish the user enjoyment of their drink', () => {
        let enjoyElement = fixture.debugElement.query(By.css('#enjoy'));
        expect(enjoyElement).toBeTruthy();
    });

    it('should throw a distinguished cheers to the user', () => {
        let cheersElement = fixture.debugElement.query(By.css('#cheers')).nativeElement;
        expect(cheersElement).toBeTruthy();
        expect(cheersElement.src).toContain('/assets/images/thanks.jpg');
    });
});

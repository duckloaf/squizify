import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { NavComponent } from './nav/nav.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { SquizifyService } from './app.service';
import { ThanksComponent } from './thanks/thanks.component';
import { SettingsComponent } from './settings/settings.component';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        CartComponent,
        NavComponent,
        HeroComponent,
        FooterComponent,
        ThanksComponent,
        SettingsComponent,
        BitcoinComponent,
        StatsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [SquizifyService],
    bootstrap: [AppComponent]
})
export class AppModule { }

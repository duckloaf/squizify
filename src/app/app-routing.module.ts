import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ThanksComponent } from './thanks/thanks.component';
import { SettingsComponent } from './settings/settings.component';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'thanks', component: ThanksComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'bitcoin', component: BitcoinComponent },
    { path: 'stats', component: StatsComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ProductsComponent } from './products/products.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'products', component: ProductsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes),FormsModule,
        ReactiveFormsModule], 
    exports:[RouterModule],
})
export class AppRoutingModule{

}

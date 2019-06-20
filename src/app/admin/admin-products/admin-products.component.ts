import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: {title: string}[]; //forcing title in p.title
  filteredProducts: any[];
  subscription: Subscription;
  
  constructor(private productSerice: ProductService) {
    this.subscription = this.productSerice.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string){
   this.filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

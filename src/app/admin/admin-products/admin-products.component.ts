import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';
import { DataTableResource, DataTable } from '@ismatjon/angular-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  
  constructor(private productSerice: ProductService) {
    this.subscription = this.productSerice.getAll()
      .subscribe(products => {
        this.products = products;

        this.initializetable(products);
      });
  }

  private initializetable(products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0, limit: 10})
      .then(items => this.items = items);
    
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string){
   let filteredProducts = (query) ? 
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : 
    this.products;

    this.initializetable(filteredProducts);
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

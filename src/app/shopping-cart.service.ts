import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreate: new Date().getTime()
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);;
  }

  //async anotation - decorating with async means method will return a promise
  private async getOrCreateCartId(): Promise<string> {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create(); //calling asnyc metod like a synchronous method using "await" operator
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      item$.update({ product: product, quantity: (item.quantity || 0) + 1 });
    });

  }
}




/*
/*
 /*
  ///check
  // https://www.udemy.com/the-complete-angular-master-class/learn/lecture/7859962#questions/7773570
  private getItem(cartId, productId) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {

      console.log(item.payload.data());


      if (!item.payload.exists) {
        item$.set({
          product: product,
          quantity: 1
        });
      } else {
        item$.update({
          quantity: item.payload.data().quantity + 1
        });
      }
    });

  }
*/

/*
async addToCart(product) {
  let cartId = await this.getOrCreateCartId();
  let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
  item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {

    if (item.payload.val()) {
      item$.update({
        quantity: item.payload.val().quantity + 1
      })
    }

    else {
      item$.update({
        product: product.payload.val(),
        quantity: 1
      })
    }
  })
}
*/
//https://stackoverflow.com/questions/53247964/property-pipe-does-not-exist-on-type-angularfireobject


/*
async addToCart(product) {
  let cartId = await this.getOrCreateCartId();
  let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
  item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {

    if (item.payload.val()) {
      item$.update({
        quantity: item.payload.val().quantity + 1
      })
    }

    else {
      item$.update({
        product: product.payload.val(),
        quantity: 1
      })
    }
  })
}


/*
async addToCart(product: Product) {
  let cartId = await this.getOrCreateCartId();
  let itemRef = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
  let item$ = itemRef.snapshotChanges();

  item$.pipe(take(1)).subscribe(item => {
    if (item.payload.exists()) itemRef.update({ quantity: item.payload.val()['quantity'] + 1 });
    else itemRef.set({ product: product, quantity: 1 });
  })
}
*/



/*
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreate: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId)
  }

  //async anotation - decorating with async means method will return a promise
  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create(); //calling asnyc metod like a synchronous method using "await" operator
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);

    item$.take(1).subscribe(item => {
      if (item.$exists()) item$.update({ quantity: item.quantity + 1 });
      else item$.set({ product: product, qunatity: 1 });
    })


  }

  async addToCart2(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);

    item$.take(1).subscribe(item => {
      if (item.payload.val()) {
        item$.update({
          quantity: item.payload.val().quantity + 1
        })
      }

      else {
        item$.update({
          product: product.payload.val(),
          quantity: 1
        })
      }
    })

  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    item$.take(1).subscribe(item => {
      let quantity = (item.['quantity'] || 0) + change;
      if (quantity === 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }



}

*/
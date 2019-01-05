import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { StorageService } from './../core/storage.service';
import { MenuItemModel } from './../menu/menu-item.model';
import { CartService } from './../core/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: MenuItemModel[];

  error: string | HttpErrorResponse;
  constructor(private readonly cart: CartService,
    private readonly storage: StorageService,
    private readonly http: HttpClient,
    private readonly router: Router) { }

  ngOnInit() {
    this.items = JSON.parse(this.storage.getItem('cart')) || [];
  }

  getTotal(): string {
    if (this.items.length === 0) {
      return '0';
      }
    return this.items.map(x => x.product_price)
        .reduce((a, b) => a + b );
    }

  emptyCart(): void {
    this.storage.removeItem('cart');
    this.items = [];
  }
  placeOrder(): void {
      const orderitems = this.items.map(item => item.product_id);
      const flattened = [];
      for (const c of orderitems) {
        const alreadyCounted = flattened.map(i => i.product_id);
        if (alreadyCounted.includes(c)) {
          flattened[alreadyCounted.indexOf(c)].product_quantity += 1;
        } else {
          flattened.push({ 'product_id': c, 'product_quantity': 1});
        }
      }
      const replace = (myObj) => {
        Object.keys(myObj).forEach((key) => {
          typeof myObj[key] === 'object' ? replace(myObj[key]) : myObj[key] = String(myObj[key]);
        });
      };
      replace(flattened);
      const order = {'items': [...flattened]};
      this.postOrder(order);
    }
  postOrder(order) {
      this.http.post('http://localhost:3000/orders', order)
      .subscribe(response => this.completeOrder(),
      (err: HttpErrorResponse) => {
        (this.items.length === 0) ? this.error = 'ERROR: Empty cart' : this.router.navigate(['/login']);
      });
    }
  completeOrder(): void {
      this.emptyCart();
      this.router.navigate(['home']);
    }
}

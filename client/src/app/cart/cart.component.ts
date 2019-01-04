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
    console.log(this.items);
  }

  getTotal(): string {
    if (this.items.length === 0) {
      return '0';
      }
    return this.items.map(x => x.product_price)
        .reduce((a, b) => a + b );
    }
    placeOrder() {
      const order =  {'items': []};
      this.items.forEach(item => order.items.push ({'product_id': `${item.product_id}`, 'product_quantity': '1' }));
      console.log(order);

      this.http.post('http://localhost:3000/orders', order)
      .subscribe(response => alert(response),
      (err: HttpErrorResponse) => this.router.navigate(['/login']));

    }
}

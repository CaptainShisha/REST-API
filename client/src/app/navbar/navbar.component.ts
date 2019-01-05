import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { StorageService } from '../core/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartitems = 0;
  constructor(private readonly storage: StorageService) {}

  getCartItemsCount () {
    const cart = JSON.parse(this.storage.getItem('cart'));
    if (cart) {
    this.cartitems = cart.length;
    } else {
      this.cartitems = 0;
    }
    return this.cartitems;
  }
  ngOnInit() {
    this.getCartItemsCount ();
  }
}

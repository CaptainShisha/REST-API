import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { MenuItemModel } from '../menu/menu-item.model';

  @Injectable()
  export class CartService {
    public constructor(private readonly storageService: StorageService) {}

    addItem (item: MenuItemModel): void {
        if (!this.storageService.getItem('cart')) {
            this.storageService.setItem('cart', JSON.stringify([item]));
        } else {
            const currentCart = JSON.parse(this.storageService.getItem('cart'));
            currentCart.push(item);
            this.storageService.setItem('cart', JSON.stringify(currentCart));
        }
    }
  }

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { MenuItemModel } from './../menu/menu-item.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  item: MenuItemModel = new MenuItemModel();
  categorySelection = '';

  error: string | HttpErrorResponse;
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  ngOnInit() {
  }
  add (): any {
  console.log(this.item.product_type);
    return this.http.post('http://localhost:3000/menu', this.item)
    .subscribe(res => this.router.navigate(['/menu']),
    (err: HttpErrorResponse) => this.error = err.error.message);

  }
}


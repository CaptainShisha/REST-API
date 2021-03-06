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
  file?;

  error: string | HttpErrorResponse;
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }
  add (): any {

    const form_data = new FormData();

// tslint:disable-next-line:forin
for ( const key in this.item ) {
    form_data.append(key, this.item[key]);
}
form_data.append('image', this.file);
    return this.http.post('http://localhost:3000/menu', form_data)
    .subscribe(res => this.router.navigate(['/menu']),
    (err: HttpErrorResponse) => this.error = err.error.message);

  }
}


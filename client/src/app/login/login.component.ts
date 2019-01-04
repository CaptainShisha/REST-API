import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../core/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  token: string;

  error: HttpErrorResponse | string;

  constructor(private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly router: Router) { }
  login (): any {
    const credentials = {
      'username': this.username,
      'password': this.password
    };
    return this.http.post('http://localhost:3000/login', credentials)
    .subscribe(res => this.redirect(res),
    (err: HttpErrorResponse) => this.error = err.error.message);
  }

  redirect(res) {
    this.storageService.setItem('token', (<any>res));
    this.router.navigate(['/menu']);
  }
  ngOnInit() {
  }

}

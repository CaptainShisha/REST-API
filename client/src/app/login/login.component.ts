import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private readonly router: Router) { }
  login (): any {
    const credentials = {
      'username': this.username,
      'password': this.password
    };
    return this.http.post('http://localhost:3000/login', credentials)
    .subscribe(res => this.router.navigate (['/menu']),
    (err: HttpErrorResponse) => this.error = err.error.message);
  }

  ngOnInit() {
  }

}

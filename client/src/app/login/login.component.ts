import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  token: string;

  constructor(private readonly http: HttpClient) { }
  login (): any {
    const credentials = {
      'username': this.username,
      'password': this.password
    };
    return this.http.post('http://localhost:3000/login', credentials)
    .subscribe(res => console.log(res),
    (err: HttpErrorResponse) => console.log(err.error.message) );
  }

  ngOnInit() {
  }

}

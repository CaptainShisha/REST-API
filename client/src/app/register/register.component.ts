import { UserRegisterModel } from './user-registration.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserRegisterModel = new UserRegisterModel();
  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
  }
  signUp (): any {
 console.log(this.user);
    return this.http.post('http://localhost:3000/users', this.user)
    .subscribe(res => console.log(res),
    (err: HttpErrorResponse) => console.log(err.error.message) );
  }
}

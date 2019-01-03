import { Router } from '@angular/router';
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

  error: string | HttpErrorResponse;
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  ngOnInit() {
  }
  signUp (): any {
 console.log(this.user);
    return this.http.post('http://localhost:3000/users', this.user)
    .subscribe(res => this.router.navigate(['/login']),
    (err: HttpErrorResponse) => this.error = err.error.message);
  }
}

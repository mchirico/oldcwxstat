import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log('okay on submit');
    this.authService.signup(email, password).subscribe(
      resData => {
        console.log(resData);
        this.authService.emailVerification(resData.idToken).subscribe(resEmail => {
            console.log(resEmail);
          },
          error => {
            console.log('Email verification failed');
          });
      },
      error => {
        console.log(error);
      });
    form.reset();
  }

}
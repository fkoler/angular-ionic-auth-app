import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  email: any;

  constructor(public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {

    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {

      this.email = userEmail;
    } else {

      console.log('User email not found.');
    }
  }

  logOut() {

    localStorage.removeItem('userEmail');

    this.authService.signOut()
      .then(() => this.router.navigate(['/landing']))
      .catch((err) => console.error(err));
  }
}

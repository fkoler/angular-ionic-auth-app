import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: any;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {
    this.user = authService.getProfile();
  }

  async logOut() {

    this.authService.signOut()
      .then(() => this.router.navigate(['/landing']))
      .catch((err) => console.error(err));
  }
}

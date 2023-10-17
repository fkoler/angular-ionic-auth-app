import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  email!: string;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() { }

  async resetPassword() {

    this.authService.resetPassword(this.email)
      .then(() => {
        console.log('reset link sent');
        this.router.navigate(['/login'])
      })
      .catch((err) => console.error(err));
  }
}

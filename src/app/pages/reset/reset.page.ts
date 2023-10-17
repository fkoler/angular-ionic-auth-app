import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage {
  resetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.resetForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
    });
  }

  resetPassword() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value.email)
        .then(() => {
          console.log('Reset link sent');
          this.router.navigate(['/login']);
        })
        .catch((err) => console.error(err));
    } else {
      console.log('Invalid email address');
    }
  }
}

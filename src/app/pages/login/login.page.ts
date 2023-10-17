import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({

      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]],

      password: ['', [
        Validators.required,
        Validators.pattern('^.{8,15}$'),
      ]],
    });
  }

  get errorControl() {

    return this.loginForm?.controls;
  };

  async logIn() {

    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((err) => {
      console.error(err);
      loading.dismiss();
    });

    if (user) {

      loading.dismiss();
      this.router.navigate(['/home']);
    } else {
      console.log('Provide correct values');
    }
  }
}

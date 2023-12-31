import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  regForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
    public router: Router,
  ) { }

  ngOnInit() {

    this.regForm = this.formBuilder.group({

      fullname: ['', [Validators.required]],
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

    return this.regForm?.controls;
  };

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password).catch((err) => {
      console.error(err);
      loading.dismiss();
    });

    if (user) {

      localStorage.setItem('userEmail', this.regForm.value.email);

      loading.dismiss();
      this.router.navigate(['/home']);
    } else {
      console.log('Provide correct values');
    }
  }
}

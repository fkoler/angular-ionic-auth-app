import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    public formBuilde: FormBuilder,
    public loadingController: LoadingController,
    public authService: AuthenticationService,
  ) {

  }

  ngOnInit() {

    this.regForm = this.formBuilde.group({
      fullname: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$'),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
      ]],
    });
  }

  getErrorControl() {

    return this.regForm?.controls;
  };

  async signUp() {

    const loading = await this.loadingController.create();

    await loading.present();

    if (this.regForm?.valid) {

      // const user = await this.authService.registerUser(email, password);
    }

  }
}

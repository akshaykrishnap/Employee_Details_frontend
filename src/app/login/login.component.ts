import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiServiceService } from '../services/api-service.service';
import { error } from 'highcharts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInEmail: string = ""
  logInPswd: string = ""

  constructor(private api: ApiServiceService, private router:Router) { }

  login() {
    if (!this.logInEmail || !this.logInPswd) {
      Swal.fire({
        title: 'Ooops',
        text: 'Please Fill the Form Completely',
        icon: 'info'
      })

    } else {
      this.api.loginAPI().subscribe({
        next: (res: any) => {
          console.log(res);
          const { email, password } = res
          if (email == this.logInEmail && password == this.logInPswd) {
            Swal.fire({
              title: 'Wooh',
              text: 'Login Successfull',
              icon: 'success'
            })
            this.router.navigateByUrl('dashboard')
          } else {
            Swal.fire({
              title: 'Ooops',
              text: 'Login Failed',
              icon: 'error'
            })
          }

        },
        error: (err: any) => {
          console.log(err);

        }
      })

    }
  }

}

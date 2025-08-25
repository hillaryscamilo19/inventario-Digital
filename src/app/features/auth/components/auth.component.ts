import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  formLogin: FormGroup = new FormGroup({});
 constructor(private asAuthServices: ServicesService) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('',[
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',[
          Validators.required,
          Validators.minLength(6),
          Validators.min(12)
        ])
      }
    )
  }

  sendLogin(): void{
    const {email, password} = this.formLogin.value
    this.asAuthServices.sendCredentials(email, password)

  }

}

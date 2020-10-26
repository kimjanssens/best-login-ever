import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public passwordHidden = true;
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      ['current-password']: ['', [
        Validators.required,
        Validators.minLength(8),
        lowercaseValidator,
        uppercaseValidator
      ]]
    });
  }

  public togglePassword(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  public submit(): void {
    this.submitted = true;

    console.log(this.loginForm.value);
  }
}

/** A password must contain at least one lowercase letter */
export function lowercaseValidator(c: FormControl): { [key: string]: boolean | null } {
  const regex = /[a-z]/g;

  if (regex.test(c.value)) {
    return null;
  } else {
    return { lowercase: true };
  }
}

/** A password must contain at least one uppercase letter */
export function uppercaseValidator(c: FormControl): { [key: string]: boolean | null } {
  const regex = /[A-Z]/g;

  if (regex.test(c.value)) {
    return null;
  } else {
    return { uppercase: true };
  }
}
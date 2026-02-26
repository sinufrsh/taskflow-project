import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';

  passwordStrength = 0;

  constructor(private auth: AuthService, private router: Router) { }

  // PASSWORD STRENGTH CHECK
  checkStrength() {
    let strength = 0;

    if (this.password.length >= 8) strength++;
    if (/[A-Z]/.test(this.password)) strength++;
    if (/[0-9]/.test(this.password)) strength++;
    if (/[^A-Za-z0-9]/.test(this.password)) strength++;

    this.passwordStrength = strength;
  }

  passwordsMatch() {
    return this.password === this.confirmPassword;
  }

  registerUser() {

    if (!this.passwordsMatch()) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: () => {
        alert("Registration successful");
        this.router.navigate(['/']);
      },
      error: () => alert("Registration failed")
    });
  }
}
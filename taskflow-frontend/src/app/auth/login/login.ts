import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth';
import { SessionService } from '../../shared/session';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private session: SessionService
  ) { }

  loginUser() {
    this.auth.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          alert(res);

          // SAVE SESSION
          this.session.setEmail(this.email);

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert(err.error || "Invalid email or password");
        }
      });
  }
}
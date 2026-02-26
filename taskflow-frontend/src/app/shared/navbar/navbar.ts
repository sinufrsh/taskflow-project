import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session';
@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class Navbar {

    constructor(private router: Router, private session: SessionService) { }

    logout() {
        this.session.clear();
        this.router.navigateByUrl('/'); // forces UI refresh
    }
}

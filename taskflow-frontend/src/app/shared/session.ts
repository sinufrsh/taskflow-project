import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionService {

    setEmail(email: string) {
        sessionStorage.setItem("email", email);
    }

    getEmail(): string {
        return sessionStorage.getItem("email") || '';
    }

    clear() {
        sessionStorage.removeItem("email");
    }

    isLoggedIn(): boolean {
        return this.getEmail() !== '';
    }
}
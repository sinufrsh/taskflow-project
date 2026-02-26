import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../shared/session';

export const authGuard: CanActivateFn = () => {

    const session = inject(SessionService);
    const router = inject(Router);

    if (session.getEmail()) {
        return true; // user logged in
    }

    // not logged in → redirect
    router.navigate(['/']);
    return false;
};
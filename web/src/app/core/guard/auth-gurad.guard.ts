import { inject } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    const router:Router = inject(Router);
    const protectedRoutes: string[] = ['/admin']
  return protectedRoutes.includes(state.url) && 
  !sessionStorage.getItem('user')
    ?router.navigate(['/auth'])
    :true
};


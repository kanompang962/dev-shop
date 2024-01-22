import { Injectable, inject } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate {
  public menuConfig: any;
  public filterMenuList: any = [];
  public permissions: any = [];

  constructor(
    // public authService: AuthService,
    public router: Router,
    // public translate: TranslateService,
    // private permissionsService: NgxPermissionsService
  ) { }

  canActivate(): boolean {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}


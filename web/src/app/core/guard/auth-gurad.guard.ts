import { Injectable,  } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import { getSession } from '../funcs/sessionService';


@Injectable({
  providedIn: 'root',
})

export class AuthGuardService implements CanActivate {
  public menuConfig: any;
  public filterMenuList: any = [];
  public permissions: any = [];

  constructor(
    public router: Router,
    private utilityService: UtilityService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    this.setTilePage(route);

    if (!getSession('user')) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }

  setTilePage(route: ActivatedRouteSnapshot): void {
    const urlPath = route.routeConfig?.path;
    const currentTitle = this.getAction(urlPath);
    this.utilityService.setTitle(currentTitle);
  }

  getAction(urlPath:string | undefined) {
    console.log(urlPath)
    switch (urlPath) {
      case '':
        return 'Dashboard';
      case 'Dashboard':
        return 'Dashboard';
      case 'Products':
        return 'Products';
      case 'Users':
        return 'upUsersdate';
      default:
        return urlPath;
    }
  }
}


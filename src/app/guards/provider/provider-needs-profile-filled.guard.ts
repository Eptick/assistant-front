import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService, UserProfile } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderNeedsProfileFilledGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable((observer: Observer<boolean | UrlTree>) => {
      this.auth.userPofile.subscribe((userProfile: UserProfile) => {
        if(userProfile.profileFilled) {
          observer.next(true);
        } else {
          observer.next(this.router.parseUrl("onboarding/provider"))
        }
        observer.complete();
      })
    });
  }

}

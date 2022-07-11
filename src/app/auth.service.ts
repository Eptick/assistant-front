import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { catchError, EMPTY, Observable, Observer } from 'rxjs';
import { ResourceServerService } from './resource-server.service';

export type UserProfile = {
  uuid: string;
  username: string;
  profileFilled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _userProfile: UserProfile | null = null;

  constructor(
    public keycloak: KeycloakService,
    public router: Router,
    private resourceServer: ResourceServerService
  ) {
    this.keycloak.loadUserProfile();
  }

  get username() {
    try {
      return this.keycloak.getUsername();
    } catch (error) {
      return '';
    }
  }

  login() {
    this.router.navigate(['/protected']);
  }

  public get userPofile(): Observable<UserProfile> {
    return new Observable<UserProfile>((observable: Observer<UserProfile>) => {
      if(this._userProfile === null) {
        this.resourceServer.getUserProfile()
        .pipe(catchError((error) => {
          observable.error(error);
          return EMPTY;
        }))
        .subscribe(data => {
          this._userProfile = data as UserProfile;
          observable.next(this._userProfile as UserProfile);
          observable.complete();
        })
      } else {
        observable.next(this._userProfile as UserProfile)
        observable.complete();
      }
    });
  }

}

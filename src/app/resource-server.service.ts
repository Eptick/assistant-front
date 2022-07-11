import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResourceServerService {
  public readonly base: string = 'https://assistant.redzic.hr/api';

  constructor(private _http: HttpClient) {}

  public getUserProfile() {
    return this.http.get(`${this.base}/users/user`);
  }

  public get http() {
    return this._http;
  }
}

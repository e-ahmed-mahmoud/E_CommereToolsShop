import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Address, User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import { SnackbarService } from './snackbar.service';
import { map, tap } from 'rxjs';
import { SignalRService } from './signalr.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseURL = environment.ApiUrl;

  http = inject(HttpClient);
  snackbarservice = inject(SnackbarService);
  signalrService = inject(SignalRService);

  currentUser = signal<User | null>(null);
  userRoles = signal<string[] | null>(null);

  login(values: any) {
    let params = new HttpParams();
    params = params.append('useCookies', true);

    return this.http
      .post<User>(this.baseURL + '/login', values, { params })
      .pipe(tap(() => this.signalrService.createHubConnection()));
  }

  register(values: any) {
    return this.http.post(this.baseURL + '/account/register', values);
  }

  getUserInfo() {
    return this.http.get<User>(this.baseURL + '/account/user-info').pipe(
      map((value: User) => {
        this.currentUser.set(value);
        return value;
      }),
    );
  }
  getUserRoles() {
    return this.http.get<string[] | null>(this.baseURL + '/account/GetUserRoles').pipe(
      map((value) => {
        this.userRoles.set(value);
        return value;
      }),
    );
  }

  isAuthenticated() {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseURL + '/account/AuthStatus');
  }

  logout() {
    return this.http
      .get(this.baseURL + '/account/logout')
      .pipe(tap(() => this.signalrService.stopHubConnection()));
  }

  updateAddress(value: Address) {
    return this.http.post<Address>(this.baseURL + '/account/address', value).pipe(
      tap(() => {
        this.currentUser.update((cur) => {
          if (cur) cur.address = value;
          return cur;
        });
      }),
    );
  }
}

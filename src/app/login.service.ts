import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient) { }

  public userLogin(user: UserDetails) {
     console.log("Inside loginService userLogin"+user.username);
     return this.client.post("http://localhost:9091/auth/authenticate",user,{responseType: 'text' });
     }
}

export class UserDetails {
  username: string | undefined;
  password: string | undefined;
}
import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { User } from '../../../models/User';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';

interface LoginRequest{
  username:string,
  password:string  
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private url: string=`${environment.backendUrl}/login`; 

  constructor( private http: HttpClient) { }
  
  login (username : string , password : string){
    const body : LoginRequest ={username, password };

    return this.http.post<any>(this.url, body);
  }


  // private _auth = inject(Auth);

  // registerUser(user:User){
  //   return createUserWithEmailAndPassword(
  //     this._auth,
  //     user.email,
  //     user.password
  //   );

  // }

  // loginUser(user:User){
  //   return signInWithEmailAndPassword(this._auth, user.email, user.password);
  // }
  

  // signInWithGoogle() {
  //   const provider = new GoogleAuthProvider();

  //   // provider.setCustomParameters({ prompt: 'select_account' });

  //   return signInWithPopup(this._auth, provider);
  // }
}

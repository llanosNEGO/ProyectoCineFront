import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';

export interface User{
  email:string;
  password:string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private _auth = inject(Auth);

  constructor() { }

  registerUser(user:User){
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );

  }

  loginUser(user:User){
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }
  

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    // provider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(this._auth, provider);
  }
}

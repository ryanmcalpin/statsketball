import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './user.model';

@Injectable()
export class AuthenticateService {
  user: Observable<firebase.User>;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe(user=>{
      if(user){
        var ref = firebase.database().ref('/users');
        ref.once('value', (snapshot)=>{
          if(!snapshot.hasChild(user.uid)){
            let newUser = new User(user.displayName, user.email, user.photoURL, (new Date).toJSON());
            ref.child(user.uid).set(newUser);
          }
        })
      }
    });
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    if(confirm("Are you sure you want to leave?")){
      this.afAuth.auth.signOut();
    }
  }

  switchUser(){
    this.logout();
    this.loginGoogle();
  }

  getCurrentUser(){
    return this.user;
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    //this approach might be a bit different if the website would contain user registration
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.userCollection = db.collection('users');
  }

  public async createUser(userDate: IUser) {
    if (!userDate.password) {
      throw new Error('Password not provide!');
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userDate.email,
      userDate.password
    );
    if (!userCred.user) {
      throw new Error("User can't be found");
    }

    await this.userCollection.doc(userCred.user?.uid).set({
      name: userDate.name,
      email: userDate.email,
      age: userDate.age,
      phoneNumber: userDate.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userDate.name,
    });
  }
}
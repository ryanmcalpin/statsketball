export class User {
  photoURL: string;
  constructor(public name: string, public email:string, photoURL: string, public dateCreated:any){
    if (photoURL){
      this.photoURL = photoURL
    } else {
      this.photoURL = 'http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg'
    }
  }
}

export class User {
  photoURL: string;
  constructor(name: string, email:string, photoURL: string, dateCreated:any){
    if (photoURL){
      this.photoURL = photoURL
    } else {
      this.photoURL = 'http://donatered-asset.s3.amazonaws.com/assets/default/default_user-884fcb1a70325256218e78500533affb.jpg'
    }
  }
}

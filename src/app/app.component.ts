import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { DbService } from './db.service';
import { AuthenticateService } from './authenticate.service';
import { MaterializeAction } from 'angular2-materialize';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app works!';
  routeSections;
  user: any = null;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private authService: AuthenticateService){}

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.routeSections = event['url'].split('/').filter(route => (route));
    });
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(user=>{
      this.user = user;
      console.log(this.user);
    });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loginGoogleComponent(){
    this.authService.loginGoogle();
  }

  logoutComponent(){
    this.authService.logout();
  }
}

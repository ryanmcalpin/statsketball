import { Component ,OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  currentPage;

  constructor(){}

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.currentPage = event['url'].split('/').filter(route => (route));
      console.log(this.currentPage);
    })
  }
}

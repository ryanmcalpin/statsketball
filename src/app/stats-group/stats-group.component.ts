import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-group',
  templateUrl: './stats-group.component.html',
  styleUrls: ['./stats-group.component.css']
})
export class StatsGroupComponent implements OnInit {
  @Input() stat: any;
  @Input() statName: any;
  @Input() statTitle: any;
  @Input() player: any;

  constructor() { }

  ngOnInit() {
  }

  increment(player: any, key: string, stats: string) {
    var updates = {};
    updates[key] = parseInt(stats) + 1;
    player.stats.update(updates);
  }
  decrement(player: any, key: string, stats: string) {
    var updates = {};
    updates[key] = parseInt(stats) - 1;
    player.stats.update(updates);
  }

}

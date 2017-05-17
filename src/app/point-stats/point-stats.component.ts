import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-point-stats',
  templateUrl: './point-stats.component.html',
  styleUrls: ['./point-stats.component.css']
})
export class PointStatsComponent implements OnInit {
  @Input() made: any;
  @Input() madeName: any;
  @Input() attempt: any;
  @Input() attemptName: any;
  @Input() statTitle: any;
  @Input() player: any;

  constructor() { }

  ngOnInit() {
  }

  incrementMade(madeStat: string, attemptStat: string) {
    var updates = {};
    updates[this.madeName] = parseInt(madeStat) + 1;
    updates[this.attemptName] = parseInt(attemptStat) + 1;
    this.player.stats.update(updates);
  }
  decrementMade(madeStat: string, attemptStat: string) {
    var updates = {};
    updates[this.madeName] = parseInt(madeStat) - 1;
    updates[this.attemptName] = parseInt(attemptStat) - 1;
    this.player.stats.update(updates);
  }

  incrementMiss(player: any, key: string, stats: string) {
    var updates = {};
    updates[key] = parseInt(stats) + 1;
    player.stats.update(updates);
  }
  decrementMiss(player: any, key: string, stats: string) {
    var updates = {};
    updates[key] = parseInt(stats) - 1;
    player.stats.update(updates);
  }

}

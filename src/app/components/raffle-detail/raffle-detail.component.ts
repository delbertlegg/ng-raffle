import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Raffle } from '../../models/raffle.model';
import { RaffleService } from '../../services/raffle.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-raffle-detail',
  templateUrl: './raffle-detail.component.html',
  styleUrls: ['./raffle-detail.component.css']
})
export class RaffleDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  raffle: Raffle;
  doughnutChartType = 'doughnut';
  donutChartData = [];
  peopleCount: number;
  totalEntries: number;
  chart: Chart;
  constructor(private _route: ActivatedRoute, private _raffleService: RaffleService) { }

  ngOnInit() {
    this.raffle = this._route.snapshot.data['raffle'];
    this._raffleService.getEntryCounts(this.raffle.id.toString()).subscribe(res => {
      res.forEach(entry => this.donutChartData.push(entry.count));
      this.peopleCount = this.donutChartData.length;
      this.totalEntries = this.donutChartData.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    });
  }

  ngAfterViewInit(): void {
    if (this.totalEntries > 0) {
      const ctx = this.canvasRef.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        options: {
          tooltips: {
            enabled: false
          }
        },
        data: {
          datasets: [{
            data: this.donutChartData
          }]
        }
      });
    }
  }
}

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raffle } from '../../models/raffle.model';
import { RaffleService } from '../../services/raffle.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-raffle-detail',
  templateUrl: './raffle-detail.component.html',
  styleUrls: ['./raffle-detail.component.css']
})
export class RaffleDetailComponent implements OnInit {

  @ViewChild('myCanvas') canvasRef: ElementRef;
  raffle: Raffle;
  doughnutChartType = 'doughnut';
  donutChartData = [];
  peopleCount: number;
  totalEntries: number;
  chart = {};

  constructor(private _router: Router, private _route: ActivatedRoute, private _raffleService: RaffleService) { }

  ngOnInit() {
    this.raffle = this._route.snapshot.data['raffle'];
    this._raffleService.getEntryCounts(this.raffle.id.toString()).subscribe(res => {
      res.forEach(entry => this.donutChartData.push(entry.count));
      this.peopleCount = this.donutChartData.length;
      this.totalEntries = this.donutChartData.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
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
              data: this.donutChartData,
              backgroundColor: (() => {
                const backgroundColors = [
                  '#FFCC5D',
                  '#52DF52',
                  '#46BFBF',
                  '#5975CB',
                ];
                const bgcolors = [];
                for (let i = 0; i < this.donutChartData.length; ++i) {
                  bgcolors.push(backgroundColors[i % backgroundColors.length]);
                }
                return bgcolors;
              })()
            }]
          }
        });
      }
    });
  }

  onBackClick() {
    this._router.navigateByUrl('raffles');
  }

  onAddEntryClick() {
    this._router.navigate(['add-entries'], { queryParams: { raffleId: this.raffle.id } });
  }
}

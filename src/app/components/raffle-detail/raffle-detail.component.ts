import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Raffle } from '../../models/raffle.model';
import { RaffleService } from '../../services/raffle.service';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { flatMap, switchMap, map } from 'rxjs/operators';
import { Winner } from '../../models/winner.model';

@Component({
  selector: 'app-raffle-detail',
  templateUrl: './raffle-detail.component.html',
  styleUrls: ['./raffle-detail.component.css']
})
export class RaffleDetailComponent implements OnInit {
  @ViewChild('myCanvas')
  canvasRef: ElementRef;
  raffle: Raffle;
  doughnutChartType = 'doughnut';
  donutChartData = [];
  peopleCount: number;
  totalEntries: number;
  chart = {};
  winner: Observable<any>;
  showButton: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private raffleService: RaffleService
  ) {}

  ngOnInit() {
    this.raffle = this.route.snapshot.data['raffle'];
    this.showButton = this.raffleService
      .getWinnerById(this.raffle.id.toString())
      .pipe(map(res => !res || !res.prizeClaimed));
    this.raffleService
      .getEntryCounts(this.raffle.id.toString())
      .subscribe(res => {
        res.forEach(entry => this.donutChartData.push(entry.count));
        this.peopleCount = this.donutChartData.length;
        this.totalEntries = this.donutChartData.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        );
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
              datasets: [
                {
                  data: this.donutChartData,
                  backgroundColor: (() => {
                    const backgroundColors = [
                      '#FFCC5D',
                      '#52DF52',
                      '#46BFBF',
                      '#5975CB'
                    ];
                    const bgcolors = [];
                    for (let i = 0; i < this.donutChartData.length; ++i) {
                      bgcolors.push(
                        backgroundColors[i % backgroundColors.length]
                      );
                    }
                    return bgcolors;
                  })()
                }
              ]
            }
          });
        }
      });
  }

  onBackClick() {
    this.router.navigateByUrl('raffles');
  }

  onAddEntryClick() {
    this.router.navigate(['add-entries'], {
      queryParams: { raffleId: this.raffle.id }
    });
  }

  drawWinner() {
    this.winner = this.raffleService.drawWinner(this.raffle.id.toString()).pipe(
      flatMap(winner => {
        this.raffleService.emitWinners();
        return this.raffleService.addWinner(winner[0]);
      })
    );
  }
}

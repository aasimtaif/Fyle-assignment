import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartModule } from 'primeng/chart';
interface Workout {
  type: string;
  minutes: number;
}

interface Customer {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-wokrout-details',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './wokrout-details.component.html',
  styleUrl: './wokrout-details.component.css'
})
export class WorkoutDetailsComponent implements OnInit {
  customer: Customer | undefined;
  basicData: any;
  basicOptions: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customer = history.state.data;

    if (this.customer) {
      this.basicData = {
        labels: this.customer.workouts.map(workout => workout.type),
        datasets: [
          {
            label: 'Workout Minutes',
            data: this.customer.workouts.map(workout => workout.minutes),
            backgroundColor: ['rgba(255, 159, 64, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(153, 102, 255, 0.5)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 2
          }
        ]
      };

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }
        }
      };
    }
  }
}

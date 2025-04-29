import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { StatisticsService } from '../../services/statistics.service';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { MatPaginator } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { Notyf } from 'notyf';
import { SystemStatisticsDto, UserGrowth, UserStatisticsDto } from '../../models/UserGrowth';
import { UsersService } from '../../services/users.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-statistics',
  standalone: true,
  imports: [MatTableModule, MatCardModule, NgChartsModule, MatPaginator, MatDividerModule],
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.css']
})
export class UserStatisticsComponent implements OnInit, AfterViewInit {
  public userGrowthData: UserGrowth[] = [];
  public isLoading = true;
  
  public chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'User Growth',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  
  private notyf = new Notyf({
    duration: 5000,
    position: { x: 'center', y: 'top' },
    dismissible: true 
  });
  
  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        title: { display: true, text: 'Month/Year' },
        grid: { display: false }
      },
      y: { 
        title: { display: true, text: 'Users Count' },
        beginAtZero: true,
        min: 0,
        suggestedMin: 0,
        ticks: {
          precision: 0, // Only show whole numbers
          padding: 0    // No padding between axis and ticks
        },
        grid: {
          drawTicks: true,
          drawOnChartArea: true
        },
        border: {
          display: true
        },
        afterFit: (scaleInstance) => {
          // Ensure no bottom padding
          scaleInstance.paddingBottom = 0;
        },
        afterDataLimits: (scale) => {
          // Force scale to include zero
          scale.min = 0;
        }
      }
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    animation: {
      duration: 1000
    },
    layout: {
      padding: {
        bottom: 0 // No padding on the bottom
      }
    }
  };

  public systemBarChartData: ChartData<'bar'> = {
    labels: ['System Statistics'],
    datasets: [
      {
        label: 'Users',
        data: [0],
        backgroundColor: 'rgba(255, 44, 118, 0.7)'
      },
      {
        label: 'Drawings',
        data: [0],
        backgroundColor: 'rgba(255, 206, 86, 0.7)'
      },
      {
        label: 'PaintedDrawings',
        data: [0],
        backgroundColor: 'rgba(75, 192, 192, 0.7)'
      }
    ]
  };

  public systemBarChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true,
        min: 0,
        suggestedMin: 0,
        ticks: {
          precision: 0
        }
      }
    },
    plugins: { 
      legend: { display: true, position: 'top' },
      tooltip: { mode: 'index', intersect: false }
    },
    animation: {
      duration: 1000
    }
  };

  public systemStatistics: SystemStatisticsDto = {
    totalUsers: 0,
    totalDrawings: 0,
    totalPaintedDrawings: 0
  };

  displayedColumns: string[] = ['username', 'albumCount', 'fileCount'];
  dataSource = new MatTableDataSource<UserStatisticsDto>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('systemBarChart') systemBarChart!: BaseChartDirective;
  @ViewChild('userGrowthChart') userGrowthChart!: BaseChartDirective;

  constructor(
    private userService: UsersService,
    private statisticsService: StatisticsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  ngAfterViewInit(): void {
    // Set paginator after view init
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadAllData(): void {
    this.isLoading = true;
    
    // Load all data in parallel
    Promise.all([
      this.fetchUserGrowthData(),
      this.fetchUserStatistics(),
      this.fetchSystemStatistics()
    ]).finally(() => {
      this.isLoading = false;
      this.updateCharts();
    });
  }

  private fetchUserGrowthData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getUserGrowthData().pipe(
        finalize(() => resolve())
      ).subscribe({
        next: (data: UserGrowth[]) => {
          this.userGrowthData = data;
          this.prepareChartData();
        },
        error: (error) => {
          console.error('Error loading user growth:', error);
        }
      });
    });
  }

  private fetchUserStatistics(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statisticsService.getUserStatistics().pipe(
        finalize(() => resolve())
      ).subscribe({
        next: (response: UserStatisticsDto[]) => {
          this.dataSource = new MatTableDataSource(response);
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        },
        error: (error) => {
          console.error('Error loading user statistics:', error);
        }
      });
    });
  }

  private fetchSystemStatistics(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.statisticsService.getSystemStatistics().pipe(
        finalize(() => resolve())
      ).subscribe({
        next: (response: SystemStatisticsDto) => {
          this.systemStatistics = response;
          this.updateSystemBarChart();
        },
        error: (error) => {
          console.error('Error loading system statistics:', error);
        }
      });
    });
  }

  prepareChartData(): void {
    const labels: string[] = [];
    const userCounts: number[] = [];

    this.userGrowthData.forEach((item: UserGrowth) => {
      const label = `${item.month}/${item.year}`;
      labels.push(label);
      userCounts.push(item.userCount);
    });

    // Add a zero point at the beginning if it doesn't exist
    if (userCounts.length > 0 && userCounts[0] > 0) {
      labels.unshift('Start');
      userCounts.unshift(0);
    }

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'User Growth',
          data: userCounts,
          fill: true, // Change to true to fill area under the line
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          tension: 0.1,
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointRadius: 4
        }
      ]
    };
  }

  updateSystemBarChart(): void {
    this.systemBarChartData = {
      labels: ['System Statistics'],
      datasets: [
        {
          label: 'Users',
          data: [this.systemStatistics.totalUsers],
          backgroundColor: 'rgba(255, 44, 118, 0.7)'
        },
        {
          label: 'Drawings',
          data: [this.systemStatistics.totalDrawings],
          backgroundColor: 'rgba(255, 206, 86, 0.7)'
        },
        {
          label: 'Painted Drawings',
          data: [this.systemStatistics.totalPaintedDrawings],
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }
      ]
    };
  }

  updateCharts(): void {
    setTimeout(() => {
      // Force detection of changes
      this.cdr.detectChanges();
      
      // Update charts if they exist
      if (this.userGrowthChart && this.userGrowthChart.chart) {
        this.userGrowthChart.chart.update();
      }
      
      if (this.systemBarChart && this.systemBarChart.chart) {
        this.systemBarChart.chart.update();
      }
    }, 0);
  }
  /* Add these changes to the component.ts file */
// /* 
// // Update chart options for dark theme
// ngOnInit(): void {
//   this.loadAllData();
//   this.updateChartTheme();
// }

// // Add this method to your component class
// updateChartTheme(): void {
//   // Update line chart options
//   this.chartOptions = {
//     ...this.chartOptions,
//     scales: {
//       ...this.chartOptions.scales,
//       x: {
//         ...this.chartOptions.scales.x,
//         grid: { color: 'rgba(255, 255, 255, 0.1)' },
//         ticks: { color: '#e0e0e0' }
//       },
//       y: {
//         ...this.chartOptions.scales.y,
//         grid: { color: 'rgba(255, 255, 255, 0.1)' },
//         ticks: { color: '#e0e0e0' }
//       }
//     },
//     plugins: {
//       ...this.chartOptions.plugins,
//       legend: {
//         ...this.chartOptions.plugins.legend,
//         labels: { color: '#e0e0e0' }
//       }
//     }
//   };

//   // Update bar chart options
//   this.systemBarChartOptions = {
//     ...this.systemBarChartOptions,
//     scales: {
//       ...this.systemBarChartOptions.scales,
//       x: { grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#e0e0e0' } },
//       y: { 
//         ...this.systemBarChartOptions.scales.y,
//         grid: { color: 'rgba(255, 255, 255, 0.1)' },
//         ticks: { color: '#e0e0e0' }
//       }
//     },
//     plugins: {
//       ...this.systemBarChartOptions.plugins,
//       legend: {
//         ...this.systemBarChartOptions.plugins.legend,
//         labels: { color: '#e0e0e0' }
//       }
//     }
//   };

//   // Update chart colors
//   this.chartData.datasets[0].borderColor = '#40e0d0';
//   this.chartData.datasets[0].backgroundColor = 'rgba(64, 224, 208, 0.2)';
//   this.chartData.datasets[0].pointBackgroundColor = '#40e0d0';

//   // Update bar chart colors
//   this.systemBarChartData.datasets[0].backgroundColor = 'rgba(255, 44, 118, 0.7)';
//   this.systemBarChartData.datasets[1].backgroundColor = 'rgba(255, 206, 86, 0.7)';
//   this.systemBarChartData.datasets[2].backgroundColor = 'rgba(64, 224, 208, 0.7)';
// }
// */
}
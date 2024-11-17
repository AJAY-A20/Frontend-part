import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-health-metrics',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterOutlet,RouterModule],
  templateUrl: './healthmetrics.component.html',
  styleUrls: ['./healthmetrics.component.css']
})
export class HealthMetricsComponent implements OnInit {
  healthMetricsObj = {
    logId: 0,
    username: '',
    metricId: 0,
    value: 0,
    dateRecorded: ''
  };

  submittedLogs: any[] = [];
  isSubmitting = false;
  isEditing = false;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  onSubmit(): void {
    this.isSubmitting = true;

    if (this.healthMetricsObj.logId === 0) {
      this.http.post("https://localhost:7211/api/HealthMetrics/metrics/logs", this.healthMetricsObj)
        .subscribe((res: any) => {
          if (res.logId >= 0) {
            alert("Health Metric Log Created!");
            this.submittedLogs.push(res);
          } else {
            alert("Problem in Creating Log");
          }
          this.isSubmitting = false;
          this.resetForm();
          this.cd.detectChanges();
        });
    } else {
      this.http.put(`https://localhost:7211/api/HealthMetrics/metrics/logs/${this.healthMetricsObj.logId}`, this.healthMetricsObj)
        .subscribe((res: any) => {
          if (res.logId >= 0) {
            alert("Health Metric Log Updated!");
            const index = this.submittedLogs.findIndex(log => log.logId === this.healthMetricsObj.logId);
            if (index !== -1) {
              this.submittedLogs[index] = { ...this.healthMetricsObj };
            }
          } else {
            alert("Problem in Updating Log");
          }
          this.isSubmitting = false;
          this.resetForm();
          this.cd.detectChanges();
        });
    }
  }

  fetchHealthMetricsLogs(): void {
    this.http.get<any[]>('https://localhost:7211/api/HealthMetrics/metrics/logs')
      .subscribe((data) => {
        this.submittedLogs = data;
        this.cd.detectChanges();
      });
  }

  editLog(log: any): void {
    this.healthMetricsObj = { ...log };
    this.isEditing = true;
  }

  resetForm(): void {
    this.healthMetricsObj = {
      logId: 0,
      username: '',
      metricId: 0,
      value: 0,
      dateRecorded: ''
    };
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.fetchHealthMetricsLogs();
  }
}

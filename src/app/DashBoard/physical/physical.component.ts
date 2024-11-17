import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-physical',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterOutlet,RouterModule],
  templateUrl: './physical.component.html',
  styleUrls: ['./physical.component.css']
})
export class PhysicalComponent implements OnInit {

  // Physical activity object to hold form data
  physicalActivityObj = {
    logId: 0,
    username: '',
    exerciseTypeId: 0,
    duration: '',
    caloriesBurned: 0,
    exerciseDate: ''
  };

  // Array to hold fetched logs
  submittedLogs: any[] = [];
  isSubmitting = false;  // Track the submission status
  isEditing = false; // Track if the form is in edit mode

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }  // Constructor Injection

  // Function to handle the form submission
  onSubmit(): void {
    this.isSubmitting = true;

    if (this.physicalActivityObj.logId === 0) {
      // If logId is 0, it's a new log, so POST request is made
      this.http.post("https://localhost:7210/api/ExerciseLog", this.physicalActivityObj)
        .subscribe(
          (res: any) => {
            if (res.logId >= 0) {
              alert("Physical Activity Log Created!");
              this.submittedLogs.push(res);  // Add the new log to the local list immediately
            } else {
              alert("Some Problem in Physical Activity Log Creation");
            }
            this.isSubmitting = false;  // Reset submitting state
            this.resetForm();  // Reset form after submission
            this.cd.detectChanges(); // Trigger change detection
          }
        );
    } else {
      // If logId is not 0, it's an existing log, so a PUT request is made to update
      this.http.put(`https://localhost:7210/api/ExerciseLog/${this.physicalActivityObj.logId}`, this.physicalActivityObj)
        .subscribe({
          next: (res: any) => {
            if (res && res.logId >= 0) {
              alert("Physical Activity Log Updated!");
              // Update the log in the local list immediately
              const index = this.submittedLogs.findIndex(log => log.logId === this.physicalActivityObj.logId);
              if (index !== -1) {
                this.submittedLogs[index] = { ...this.physicalActivityObj }; // Spread the updated values
              }
            } else {
              alert("Some Problem in Physical Activity Log Update");
            }
            this.isSubmitting = false;  // Reset submitting state
            this.resetForm();  // Reset form after update
            this.cd.detectChanges(); // Trigger change detection
          }
        });
    }
    
  }

  // Function to fetch physical activity logs from the backend
  fetchPhysicalActivityLogs(): void {
    this.http.get<any[]>('https://localhost:7210/api/ExerciseLog')
      .subscribe(
        (data) => {
          this.submittedLogs = data;
          this.cd.detectChanges(); // Trigger change detection
        }
      );
  }

  // Function to edit an existing log entry
  editLog(log: any): void {
    this.physicalActivityObj = { ...log }; // Pre-fill the form with log data
    this.isEditing = true;  // Set the form to editing mode
  }

  // Function to reset the form
  resetForm(): void {
    this.physicalActivityObj = {
      logId: 0,
      username: '',
      exerciseTypeId: 0,
      duration: '',
      caloriesBurned: 0,
      exerciseDate: ''
    };
    this.isEditing = false; // Reset editing flag
  }

  // On component initialization, fetch the logs
  ngOnInit(): void {
    this.fetchPhysicalActivityLogs();
  }
}

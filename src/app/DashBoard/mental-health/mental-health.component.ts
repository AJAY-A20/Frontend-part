import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mental-health',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet,RouterModule],
  templateUrl: './mental-health.component.html',
  styleUrls: ['./mental-health.component.css']
})
export class MentalHealthComponent implements OnInit {

  // Mental health object to hold form data
  mentalHealthObj = {
    logId: 0,
    username: '',
    moodId: 0,
    intensity: 0,
    notes: '',
    logDate: ''
  };

  // Array to hold fetched logs
  submittedLogs: any[] = [];
  isSubmitting = false;  // Track the submission status
  isEditing = false; // Track if the form is in edit mode
  isEditMode: any;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }  // Constructor Injection

  // Function to handle the form submission
  onSubmit(): void {
    this.isSubmitting = true;

    if (this.mentalHealthObj.logId === 0) {
      // If logId is 0, it's a new log, so POST request is made
      this.http.post("https://localhost:7283/api/MentalHealthLog", this.mentalHealthObj)
        .subscribe(
          (res: any) => {
            if (res.logId >= 0) {
              alert("Mental Log Record Created!");
              this.submittedLogs.push(res);  // Add the new log to the local list immediately
            } else {
              alert("Some Problem in Mental Log Creation");
            }
            this.isSubmitting = false;  // Reset submitting state
            this.resetForm();  // Reset form after submission
            this.cd.detectChanges(); // Trigger change detection
          }
        );
    } else {
      // If logId is not 0, it's an existing log, so PUT request is made to update
      this.http.put(`https://localhost:7283/api/MentalHealthLog/${this.mentalHealthObj.logId}`, this.mentalHealthObj)
        .subscribe(
          (res: any) => {
            if (res.logId >= 0) {
              alert("Mental Log Record Updated!");
              // Update the log in the local list immediately
              const index = this.submittedLogs.findIndex(log => log.logId === this.mentalHealthObj.logId);
              if (index !== -1) {
                // Directly mutate the object at that index with the updated data
                this.submittedLogs[index] = { ...this.mentalHealthObj };  // Spread the updated values
              }
            } else {
              alert("Some Problem in Mental Log Update");
            }
            this.isSubmitting = false;  // Reset submitting state
            this.resetForm();  // Reset form after update
            this.cd.detectChanges(); // Trigger change detection
          }
        );
    }
  }

  // Function to fetch mental health logs from the backend
  fetchMentalHealthLogs(): void {
    this.http.get<any[]>('https://localhost:7283/api/MentalHealthLog')
      .subscribe(
        (data) => {
          this.submittedLogs = data;
          this.cd.detectChanges(); // Trigger change detection
        }
      );
  }

  // Function to edit an existing log entry
  editLog(log: any): void {
    this.mentalHealthObj = { ...log }; // Pre-fill the form with log data
    this.isEditing = true;  // Set the form to editing mode
  }

  // Function to delete an existing log entry
  deleteLog(logId: number): void {
    if (confirm("Are you sure you want to delete this log?")) {
      this.http.delete(`https://localhost:7283/api/MentalHealthLog/${logId}`)
        .subscribe(
          (res: any) => {
            if (res) {
              alert("Mental Log Record Deleted!");
              // Remove the deleted log from the local list
              this.submittedLogs = this.submittedLogs.filter(log => log.logId !== logId);
              this.cd.detectChanges(); // Trigger change detection
            } else {
              alert("Problem deleting the log record.");
            }
          }
        );
    }
  }

  // Function to reset the form
  resetForm(): void {
    this.mentalHealthObj = {
      logId: 0,
      username: '',
      moodId: 0,
      intensity: 0,
      notes: '',
      logDate: ''
    };
    this.isEditing = false; // Reset editing flag
  }

  // On component initialization, fetch the logs
  ngOnInit(): void {
    this.fetchMentalHealthLogs();
  }
}

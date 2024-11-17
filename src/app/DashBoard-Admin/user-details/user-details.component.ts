import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userProfiles: {
    userProfileId: number;
    username: string;
    fullName: string;
    dob: string;
    email: string;
    mobileNumber: number;
    gender: string;
    address: string;
    profilePicture: string;
    createdAt: string;
    weight: number;
    height: number;
  }[] = []; // Inline interface for user profiles

  errorMessage: string | null = null; // To display error messages if any

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchUserProfiles();
  }

  fetchUserProfiles(): void {
    this.http
      .get<{ data: any }>('https://localhost:7006/api/UserProfile/AllUsers')
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.userProfiles = response.data;
          } else {
            this.userProfiles = [];
          }
          this.cd.detectChanges(); // Trigger change detection
        },
        error: (err) => {
          console.error('Error fetching user profiles', err);
          this.errorMessage = 'Failed to load user profiles.';
        }
      });
  }
}

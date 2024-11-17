import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterOutlet,RouterOutlet],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  userProfileObj = {
    username: '',
    fullName: '',
    dob: '',
    email: '',
    mobileNumber: '',
    gender: '',
    address: '',
    weight: null,
    height: null
  };

  isSubmitting = false;
  formSubmitted = false;
  successMessage = '';  // Success message variable
  
  // Sample API URL (replace with your actual backend API URL)
  private apiUrl = 'https://localhost:7006/api/UserProfile/AddUserProfile';  // Sample API URL

  constructor(private http: HttpClient) {}

  // Handle form submission
  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;

      // Make the POST request to submit profile data
      this.http.post(this.apiUrl, this.userProfileObj)
        .subscribe(
          (response) => {
            // Handle successful submission
            this.formSubmitted = true;
            this.isSubmitting = false;
            console.log('Form submitted successfully:', response);
            this.successMessage = 'Form submitted successfully!';  // Set the success message

            // Reset the form after successful submission
            this.resetForm(); 

            // Hide the success message after 3 seconds
            setTimeout(() => {
              this.successMessage = '';  // Clear the success message
            }, 3000);  // 3 seconds delay
          },
          (error) => {
            // Handle error (e.g., show error message)
            this.isSubmitting = false;
            console.error('Error submitting profile:', error);
          }
        );
    }
  }

  // Reset the form fields
  resetForm() {
    this.userProfileObj = {
      username: '',
      fullName: '',
      dob: '',
      email: '',
      mobileNumber: '',
      gender: '',
      address: '',
      weight: null,
      height: null
    };
  }

  // Validation method to ensure all required fields are filled
  isFormValid() {
    return this.userProfileObj.username && this.userProfileObj.fullName && this.userProfileObj.dob &&
           this.userProfileObj.email && this.userProfileObj.mobileNumber && this.userProfileObj.gender &&
           this.userProfileObj.weight && this.userProfileObj.height;
  }
}

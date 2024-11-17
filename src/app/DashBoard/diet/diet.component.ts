import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-diet',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.css']
})
export class DietComponent {
  meal = {
    mealId: 0,
    userName: '',
    mealType: '',
    consumptionDate: ''
  };

  foods: any[] = [];
  mealTypes: string[] = ['Breakfast', 'Lunch', 'Dinner']; // Default meal types
  numberOfFoods: number = 1;
  isSubmitting: boolean = false; // To manage form submission state
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) {}

  // Remove the HTTP call for meal types since we're using defaults now
  ngOnInit() {
    // Default mealTypes are already set
  }

  onFoodCountChange() {
    this.foods = [];
    for (let i = 0; i < this.numberOfFoods; i++) {
      this.foods.push({foodName: '', quantity: 0, unit: '', mealId: 0 }); // Include mealId as default
    }
  }

  async onSubmit() {
    this.isSubmitting = true; // Start submitting

    try {
      // Log meal details
      console.log('Meal payload:', this.meal);

      // Post meal to the backend and get the response
      const mealResponse: any = await firstValueFrom(this.http.post('https://localhost:7104/api/Meal', this.meal));

      // Check if meal creation was successful and extract the mealId
      if (!mealResponse || !mealResponse.mealId) {
        alert('Failed to create meal. Please try again.');
        return;
      }

      console.log('Meal created successfully with ID:', mealResponse.mealId);

      // Assign the mealId to each food object and submit food data
      for (const food of this.foods) {
        food.foodId = mealResponse.mealId; // Assign mealId to each food item
        console.log('Food payload:', food);

        // Post each food item to the backend
        try {
          await firstValueFrom(this.http.post('https://localhost:7104/api/Food', food)); // Send each food item
          console.log('Food submitted successfully:', food);
        } catch (foodError) {
          console.error('Food submission failed:', foodError);
          alert('Failed to submit food items.');
          return;
        }
      }

      // If everything succeeds, show success message
      alert('Meal and foods successfully submitted!');
      this.formSubmitted = true; // Mark form as submitted
    } catch (error: any) {
      // Log detailed error information
      console.error('Error:', error);
      if (error.error) {
        alert(`Error: ${error.error.message || 'Unknown backend error occurred.'}`);
      } else {
        alert('There was an error submitting the meal and foods.');
      }
    } finally {
      this.isSubmitting = false; // End submitting process
    }
  }
}

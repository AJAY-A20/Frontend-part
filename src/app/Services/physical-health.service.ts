import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class PhysicalHealthService {

  constructor(private http: HttpClient) { }

  // Define the API URL for physical health logs
  private apiUrl = 'https://localhost:7210/api/ExerciseLog';  // Replace with your actual API URL for physical health logs

}
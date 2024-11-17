import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
@Injectable({ 
 providedIn: 'root'
}) 
export class MentalHealthService { 
 constructor(private http: HttpClient) { } 
 getLogs() { 
 return this.http.get("https://localhost:7283/api/MentalHealthLog"); 
 } 
 private apiUrl = 'https://your-api-url/mental-health-logs';  // Replace with your API URL

 // Method to get all mental health logs from the backend
 getMentalHealthLogs(): Observable<any[]> {
   return this.http.get<any[]>(this.apiUrl);
 }
}
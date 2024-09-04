import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private baseUrl = 'http://192.168.1.40'; // Reemplaza con la IP de tu ESP32

  constructor(private http: HttpClient) { }

  getTemperature(): Observable<any> {
    return this.http.get(`${this.baseUrl}/temperature`);
  }

  getHumidity(): Observable<any> {
    return this.http.get(`${this.baseUrl}/humidity`);
  }
}

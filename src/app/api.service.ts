import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://distinct-pink-sheath-dress.cyclic.app/';

  constructor(private http: HttpClient) {}

  getItemUrl(month: number, year: number): string {
    return `${this.baseUrl}/item?month=${month}&year=${year}`;
  }

  deleteItemUrl(itemId: string): string {
    return `${this.baseUrl}/item/${itemId}`;
  }

  getWeeklyExpensesUrl(startDate: string, endDate: string): string {
    return `${this.baseUrl}/weekly-expenses?startDate=${startDate}&endDate=${endDate}`;
  }

  addItem(item: any): Observable<void> {
    const url = `${this.baseUrl}/item`;
    return this.http.post<void>(url, item);
  }
}

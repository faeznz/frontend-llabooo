import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://sore-teal-eel-hose.cyclic.app/';

  constructor(private http: HttpClient) {}

  getItemUrlId(itemId: string): string {
    return `${this.baseUrl}/item/${itemId}`;
  }

  getData(): Observable<any[]> {
    const url = `${this.baseUrl}/item`;
    return this.http.get<any[]>(url);
  }

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

  updateItemUrl(itemId: string): string {
    return `${this.baseUrl}/items/${itemId}`;
  }

  addItemUrl(): string {
    return `${this.baseUrl}/items`;
  }

  getItem(id: string): Observable<any> {
    const url = this.getItemUrlId(id);
    return this.http.get<any>(url);
  }

  deleteItem(itemId: string): Observable<void> {
    const url = this.deleteItemUrl(itemId);
    return this.http.delete<void>(url);
  }

  updateItem(itemId: string, item: any): Observable<void> {
    const url = this.updateItemUrl(itemId);
    return this.http.put<void>(url, item);
  }
}

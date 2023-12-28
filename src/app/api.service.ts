import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://cooperative-seal-pinafore.cyclic.app/';
  // private baseUrl = 'http://localhost:3000';

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

  addMenu(menu: any): Observable<void> {
    const url = `${this.baseUrl}/menu`;
    return this.http.post<void>(url, menu);
  }

  getMenus(): Observable<any[]> {
    const url = `${this.baseUrl}/menu`;
    return this.http.get<any[]>(url);
  }

  deleteMenuUrl(menuId: string): string {
    return `${this.baseUrl}/menu/${menuId}`;
  }
  
  deleteMenu(menuId: string): Observable<void> {
    const url = this.deleteMenuUrl(menuId);
    return this.http.delete<void>(url);
  }

  saveSisaBudgetUrl(): string {
    return `${this.baseUrl}/tabungan`; 
  }
  
  getTabunganData(): Observable<any[]> {
    const tabunganUrl = `${this.baseUrl}/tabungan`;
    return this.http.get<any[]>(tabunganUrl);
  }
}

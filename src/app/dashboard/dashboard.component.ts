import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any[] = [];
  selectedMonth: number = new Date().getMonth() + 1; // Initial value is the current month
  selectedYear: number = new Date().getFullYear(); // Initial value is the current year
  totalHarga: number = 0;

  months = [
    { value: 1, name: 'Januari' },
    { value: 2, name: 'Februari' },
    { value: 3, name: 'Maret' },
    { value: 4, name: 'April' },
    { value: 5, name: 'Mei' },
    { value: 6, name: 'Juni' },
    { value: 7, name: 'Juli' },
    { value: 8, name: 'Agustus' },
    { value: 9, name: 'September' },
    { value: 10, name: 'Oktober' },
    { value: 11, name: 'November' },
    { value: 12, name: 'Desember' }
  ];

  years = [2023, 2024, 2025];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    const url = `http://localhost:3000/item?month=${this.selectedMonth}&year=${this.selectedYear}`;
  
    this.http.get<any[]>(url)
      .subscribe(items => {
        this.items = items;
        this.calculateTotalHarga();
      }, error => {
        console.error('Failed to fetch items', error);
      });
  }
  
  calculateTotalHarga() {
    this.totalHarga = this.items.reduce((sum, item) => sum + item.harga, 0);
  }  
}

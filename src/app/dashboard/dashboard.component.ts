import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

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

  deleteItem(item: any): void {
    const confirmation = confirm(`Apakah Anda yakin ingin menghapus item '${item.nama}'?`);
  
    if (confirmation) {
      // Panggil endpoint untuk menghapus item dari server
      this.http.delete(`http://localhost:3000/item/${item._id}`)
        .subscribe(() => {
          // Hapus item dari array lokal
          this.items = this.items.filter(i => i._id !== item._id);
          this.calculateTotalHarga();
        }, error => {
          console.error('Failed to delete item', error);
        });
    }
  }
    
  calculateTotalHarga() {
    this.totalHarga = this.items.reduce((sum, item) => sum + item.harga, 0);
  }  

  navigateToAddPage() {
    this.router.navigate(['/tambah']);
  }
}

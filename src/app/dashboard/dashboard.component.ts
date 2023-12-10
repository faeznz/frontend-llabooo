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
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  totalHarga: number = 0;
  sisaBudget: number = 0;
  loading: boolean = false;
  weeklyExpenses: number[] = [];

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
    this.fetchWeeklyExpenses();
  }

  fetchItems() {
    this.loading = true;
    const url = `https://blue-difficult-binturong.cyclic.app/item?month=${this.selectedMonth}&year=${this.selectedYear}`;
  
    this.http.get<any[]>(url)
      .subscribe(items => {
        // Sort items by date in ascending order
        items.sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime());
  
        this.items = items;
        this.calculateTotalHarga();
        this.calculateSisaBudget();
        this.loading = false;
      }, error => {
        console.error('Failed to fetch items', error);
        this.loading = false;
      });
  }
  
  deleteItem(item: any): void {
    const confirmation = confirm(`Apakah Anda yakin ingin menghapus item '${item.nama}'?`);
  
    if (confirmation) {
      // Panggil endpoint untuk menghapus item dari server
      this.http.delete(`https://blue-difficult-binturong.cyclic.app/item/${item._id}`)
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

  calculateSisaBudget() {
    const totalPengeluaran = this.totalHarga;
    this.sisaBudget = 1200000 - totalPengeluaran;
  }

  navigateToAddPage() {
    this.router.navigate(['/tambah']);
  }

  fetchWeeklyExpenses() {
    const weeks = [[1, 7], [8, 14], [15, 21], [22, 28]];
  
    this.weeklyExpenses = [];
  
    // Create an array to store all promises
    const promises = weeks.map((week) => {
      const [startDay, endDay] = week;
      const startOfMonth = new Date(this.selectedYear, this.selectedMonth - 1, startDay);
      const endOfMonth = new Date(this.selectedYear, this.selectedMonth - 1, endDay);
  
      const url = `https://blue-difficult-binturong.cyclic.app/weekly-expenses?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}`;
  
      // Return the promise from the HTTP request
      return this.http.get<any[]>(url).toPromise();
    });
  
    // Use Promise.all to wait for all promises to resolve
    Promise.all(promises)
      .then((responses) => {
        // Process the responses and push totalExpense to weeklyExpenses
        responses.forEach((response) => {
          if (response && response.length > 0) {
            const totalExpense = response[0]?.totalExpense || 0;
            this.weeklyExpenses.push(totalExpense);
          }
        });
  
        // Sort weeklyExpenses in ascending order based on the start day
        this.weeklyExpenses.sort((a, b) => {
          const startDayA = weeks[this.weeklyExpenses.indexOf(a)][0];
          const startDayB = weeks[this.weeklyExpenses.indexOf(b)][0];
          return startDayA - startDayB;
        });
      })
      .catch((error) => {
        console.error('Failed to fetch weekly expenses', error);
      });
  }
  
  

}

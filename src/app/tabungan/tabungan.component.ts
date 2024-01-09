import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tabungan',
  templateUrl: './tabungan.component.html',
  styleUrls: ['./tabungan.component.css']
})
export class TabunganComponent implements OnInit {
  isMenuOpen: boolean = false;
  loading: boolean = false;
  tabunganData: any[] = [];
  totalBudget: number = 0;
  private monthMapping = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchTabunganData();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  hideMenu() {
    this.isMenuOpen = false;
  }

  fetchTabunganData() {
    this.loading = true;
    this.apiService.getTabunganData().subscribe(
      (data) => {
        this.tabunganData = data.map(item => ({
          ...item,
          month: this.getMonthName(item.month)
        }));
  
        this.tabunganData.sort((a, b) => {
          const yearComparison = a.year - b.year;
          if (yearComparison !== 0) {
            return yearComparison;
          }
          return a.month - b.month;
        });
  
        // Menghitung total budget
        this.totalBudget = this.tabunganData.reduce((total, data) => total + data.sisaBudget, 0);
  
        this.loading = false;
      },
      (error) => {
        console.error('Failed to fetch tabungan data', error);
        this.loading = false;
      }
    );
  }
  

  getMonthName(month: number): string {
    return this.monthMapping[month - 1] || '';
  }

  deleteTabungan(tabunganId: string): void {
    this.loading = true;
    this.apiService.deleteTabungan(tabunganId).subscribe(
      () => {
        // Refresh data setelah berhasil menghapus
        this.fetchTabunganData();
        this.loading = false;
      },
      (error) => {
        console.error('Gagal menghapus data tabungan', error);
        this.loading = false;
      }
    );
  }

}

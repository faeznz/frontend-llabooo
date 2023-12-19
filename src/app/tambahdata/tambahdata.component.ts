// tambahdata.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tambahdata',
  templateUrl: './tambahdata.component.html',
  styleUrls: ['./tambahdata.component.css'],
})
export class TambahdataComponent implements OnInit{
  newItem: any = { tanggal: '' };
  loading: boolean = false;
  menus: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchMenus();
  }

  addItem() {
    this.loading = true;
    this.apiService.addItem(this.newItem).subscribe(
      () => {
        console.log('Data item berhasil ditambahkan');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Gagal menambahkan item', error);
      }
    );
  }

  fetchMenus() {
    this.apiService.getMenus().subscribe(
      (menus) => {
        this.menus = menus;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching menus:', error);
        this.loading = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

// tambahdata.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tambahdata',
  templateUrl: './tambahdata.component.html',
  styleUrls: ['./tambahdata.component.css'],
})
export class TambahdataComponent {
  newItem: any = { tanggal: '' };
  loading: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

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

  goBack() {
    this.router.navigate(['/']);
  }
}

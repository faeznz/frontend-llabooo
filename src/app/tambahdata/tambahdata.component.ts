import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tambahdata',
  templateUrl: './tambahdata.component.html',
  styleUrls: ['./tambahdata.component.css']
})
export class TambahdataComponent {
  newItem: any = { tanggal: '' };
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  addItem() {
    this.loading = true;
    this.http.post('https://blue-difficult-binturong.cyclic.app/item', this.newItem)
      .subscribe(() => {
        console.log('Data item berhasil ditambahkan');
        this.router.navigate(['/itemDashboard']);
      }, error => {
        console.error('Gagal menambahkan item', error);
      });
  }

  goBack() {
    this.router.navigate(['/itemDashboard']);
  }
}

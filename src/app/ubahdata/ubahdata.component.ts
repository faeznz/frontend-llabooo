import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ubahdata',
  templateUrl: './ubahdata.component.html',
  styleUrls: ['./ubahdata.component.css']
})
export class UbahdataComponent {
  itemId: string = '';
  item: any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id')!;
    this.getItem(this.itemId);
  }

  getItem(id: string) {
    this.http.get<any>(`http://localhost:3000/items/${id}`)
      .subscribe(data => {
        this.item = data;
      });
  }

  updateItem() {
    this.http.put(`http://localhost:3000/items/${this.itemId}`, this.item)
      .subscribe(() => {
        console.log('Member updated successfully');
        alert('Data member berhasil diubah!');
        this.router.navigate(['/itemDashboard']);
      }, error => {
        console.log('Failed to update member', error);
      });
  }

  goBack() {
    this.router.navigate(['/itemDashboard']);
  }
}

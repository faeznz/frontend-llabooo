import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isMenuOpen: boolean = false;
  loading: boolean = false;
  newMenu: any = { };
  menus: any[] = [];

  constructor(private apiService: ApiService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchMenus();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  hideMenu() {
    this.isMenuOpen = false;
  }

  addMenu() {
    this.loading = true;
    this.apiService.addMenu(this.newMenu).subscribe(
      () => {
        console.log('Data item berhasil ditambahkan');
        this.loading = false;
        window.location.reload();
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

  deleteMenu(menuId: string) {
    this.loading = true;
    this.apiService.deleteMenu(menuId).subscribe(
      () => {
        console.log('Menu berhasil dihapus');
        this.loading = false;
        this.fetchMenus(); // Reload menus after deletion
      },
      (error) => {
        console.error('Gagal menghapus menu', error);
        this.loading = false;
      }
    );
  }
}

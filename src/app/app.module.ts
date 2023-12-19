import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RupiahPipe } from './rupiah.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TambahdataComponent } from './tambahdata/tambahdata.component';
import { UbahdataComponent } from './ubahdata/ubahdata.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'tambah', component: TambahdataComponent },
  { path: 'ubah/:id', component: UbahdataComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: 'menu', component: MenuComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TambahdataComponent,
    UbahdataComponent,
    RupiahPipe,
    SpinnerComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

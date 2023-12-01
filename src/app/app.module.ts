import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/component/home/home.component';
import { ActiveService } from './service/active.service';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [HomeComponent, ActiveService, MatTableModule],
  bootstrap: [AppComponent, HomeComponent]
})
export class AppModule { }

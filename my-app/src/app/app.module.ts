import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgModule,
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
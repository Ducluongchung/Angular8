import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routes'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

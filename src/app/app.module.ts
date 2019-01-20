import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavabarComponent } from '../app/components/navabar/navabar.component';
import { PetsComponent } from '../app/components/pets/pets.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { PetDeailsComponent } from './components/pet-deails/pet-deails.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    NavabarComponent,
    PetsComponent,
    WelcomeComponent,
    PetDeailsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DeferLoadModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

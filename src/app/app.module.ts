import { BaseService } from './services/base.service';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavabarComponent } from '../app/components/navabar/navabar.component';
import { PetsComponent } from '../app/components/pets/pets.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DeferLoadModule } from '@trademe/ng-defer-load';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AdoptionComponent } from '../app/components/adoption/adoption.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavabarComponent,
    PetsComponent,
    WelcomeComponent,
    AdoptionComponent
  ],
  imports: [
    BrowserModule,
    AngularMultiSelectModule,
    FormsModule,
    AppRoutingModule,
    DeferLoadModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthGuard, BaseService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }

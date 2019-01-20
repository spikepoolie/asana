import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PetsComponent } from '../app/components/pets/pets.component';
import { PetDeailsComponent } from '../app/components/pet-deails/pet-deails.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'WelcomeComponent', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'petdetails/:petid', component: PetDeailsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

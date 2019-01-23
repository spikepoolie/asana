import { AdoptionComponent } from '../app/components/adoption/adoption.component';
import { AuthGuard } from './auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PetsComponent } from '../app/components/pets/pets.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'WelcomeComponent', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'adoption', component: AdoptionComponent },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

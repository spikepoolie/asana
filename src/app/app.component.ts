
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PetAdoption';
  dogsJson = [];
  todayDate = new Date();
  currentyear: number = this.todayDate.getFullYear();

  constructor() {


  }
}

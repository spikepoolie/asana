import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
is = true;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToPets = () => this.router.navigate(['/pets']);

}

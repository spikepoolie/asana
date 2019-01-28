import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseService } from './../../services/base.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent implements OnInit {
  // global declaration
  mydata: any;
  dogname: string;
  dogimage: string;
  name: string;

  constructor(
    private route: ActivatedRoute,
    public baseService: BaseService,
    private router: Router
  ) {}

  hideModal = () => document.getElementById('modal01').style.display = 'none';

  ngOnInit() {
    // get the initial value from the service to define each page the user will land
    this.mydata = this.baseService.serviceData;
    if (this.mydata === undefined) {
      this.router.navigate(['/pets']);
    } else {
      this.dogname = this.mydata.name;
      this.dogimage = this.mydata.url;
    }

  }

  // show modal
  showAdoptionCard = (frm: HTMLFormElement) => {
    this.name = frm.name;
    document.getElementById('modal01').style.display = 'block';
  }
}

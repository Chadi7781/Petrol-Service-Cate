import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviseService } from "../../../core/service/devise/devise.service";
import { Devise } from '../../../core/models/devise/devise';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-update-devise',
  templateUrl: './update-devise.component.html',
  styleUrls: ['./update-devise.component.css']
})
export class UpdateDeviseComponent implements OnInit {

  id: number;
  devise: Devise;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
 


  constructor(private route: ActivatedRoute,private router: Router,
    private deviseService: DeviseService) { }

  ngOnInit() {
    this.devise = new Devise();

    this.id = this.route.snapshot.params['id'];
    
    this.deviseService.getDevise(this.id)
      .subscribe(data => {
        console.log(data)
        this.devise = data;
      }, error => console.log(error));       

    }
  
    


  updateDevise() {
    this.deviseService.updateDevise(this.id, this.devise)
      .subscribe(data => {
        console.log(data);
        this.devise = new Devise();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateDevise();    
  }

  gotoList() {
    this.router.navigate(['/devises']);
  }
}

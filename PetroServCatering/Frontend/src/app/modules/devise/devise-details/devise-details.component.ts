import { DeviseService } from "../../../core/service/devise/devise.service";
import { Devise } from '../../../core/models/devise/devise';
import { Component, OnInit, Input } from '@angular/core';
import { DeviseListComponent } from '../devise-list/devise-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-devise-details',
  templateUrl: './devise-details.component.html',
  styleUrls: ['./devise-details.component.css']
})
export class DeviseDetailsComponent implements OnInit {

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

  list(){
    this.router.navigate(['devises']);
  }
}

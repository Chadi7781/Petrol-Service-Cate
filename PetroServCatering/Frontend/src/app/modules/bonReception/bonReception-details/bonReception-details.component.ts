import { BonReception } from '../../../core/models/bonReception/bonReception';
import { Component, OnInit, Input } from '@angular/core';
import { BonReceptionService } from "src/app/core/service/bonReception/bonReception.service";
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-bonReception-details',
  templateUrl: './bonReception-details.component.html',
  styleUrls: ['./bonReception-details.component.css']
})
export class BonReceptionDetailsComponent implements OnInit {

  id: number;
  bonReception: BonReception;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private bonReceptionService: BonReceptionService) { }

  ngOnInit() {
    this.bonReception = new BonReception();

    this.id = this.route.snapshot.params['id'];
    
    this.bonReceptionService.getBonReception(this.id)
      .subscribe(data => {
        console.log(data)
        this.bonReception = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['bonReceptions']);
  }
}

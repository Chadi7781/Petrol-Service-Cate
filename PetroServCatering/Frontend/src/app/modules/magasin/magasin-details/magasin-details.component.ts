import { MagasinService } from "../../../core/service/magasin/magasin.service";
import { Magasin } from '../../../core/models/magasin/magasin';
import { Component, OnInit, Input } from '@angular/core';
import { MagasinListComponent } from '../magasin-list/magasin-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-magasin-details',
  templateUrl: './magasin-details.component.html',
  styleUrls: ['./magasin-details.component.css']
})
export class MagasinDetailsComponent implements OnInit {

  id: number;
  magasin: Magasin;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private magasinService: MagasinService) { }

  ngOnInit() {
    this.magasin = new Magasin();

    this.id = this.route.snapshot.params['id'];
    
    this.magasinService.getMagasin(this.id)
      .subscribe(data => {
        console.log(data)
        this.magasin = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['magasins']);
  }
}

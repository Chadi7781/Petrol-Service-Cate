import { ClientService } from "../../../core/service/client/client.service";
import { Client } from '../../../core/models/client/client';
import { Component, OnInit, Input } from '@angular/core';
import { ClientListComponent } from '../client-list/client-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Devise } from "src/app/core/Models/devise/devise";
import { DeviseService } from "src/app/core/service/devise/devise.service";


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  
  devisesList: Devise[] = [];
  id: number;
  client: Client;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private clientService: ClientService,
    private deviseService : DeviseService) { }

  ngOnInit() {
    this.getAllDevises();

    this.client = new Client();

    this.id = this.route.snapshot.params['id'];
    
    this.clientService.getClient(this.id)
      .subscribe(data => {
        console.log(data)
        this.client = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['clients']);
  }
  getAllDevises(){
    this.deviseService.getDevisesList().subscribe(res=>{
        this.devisesList=res;
    });
  }
}

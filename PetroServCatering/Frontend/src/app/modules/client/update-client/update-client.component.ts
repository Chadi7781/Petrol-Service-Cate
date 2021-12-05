import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from "../../../core/service/client/client.service";
import { Client } from '../../../core/models/client/client';

import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Devise } from 'src/app/core/Models/devise/devise';
import { DeviseService } from 'src/app/core/service/devise/devise.service';


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {
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
  
    


  updateClient() {
    this.clientService.updateClient(this.id, this.client)
      .subscribe(data => {
        console.log(data);
        this.client = new Client();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateClient();    
  }

  gotoList() {
    this.router.navigate(['/clients']);
  }

  getAllDevises(){
    this.deviseService.getDevisesList().subscribe(res=>{
        this.devisesList=res;
    });
  }
}

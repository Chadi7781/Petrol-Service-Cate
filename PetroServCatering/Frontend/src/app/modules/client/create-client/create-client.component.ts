
import { ClientService } from "../../../core/service/client/client.service";
import { Client } from '../../../core/models/client/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Devise } from "src/app/core/Models/devise/devise";
import { DeviseService } from "src/app/core/service/devise/devise.service";


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  devisesList: Devise[] = [];
  client: Client = new Client();
  devise: Devise = new Devise();
  submitted = false;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private clientService: ClientService,
    private router: Router,
    private deviseService : DeviseService) { }

  ngOnInit() {
    this.getAllDevises();
    this.newClient();
  }

  
 
  newClient(): void {
    this.submitted = false;
    this.client = new Client();
  }

  
  save() {
    this.clientService
    .createClient(this.client).subscribe(data => {
      console.log(data)
      this.client = new Client();
      this.gotoList();
      
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
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
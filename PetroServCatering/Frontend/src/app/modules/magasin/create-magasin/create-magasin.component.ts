
import { MagasinService } from "../../../core/service/magasin/magasin.service";
import { Magasin } from '../../../core/models/magasin/magasin';
import { EmployeeService } from "../../../core/service/employee/employee.service";
import { Employee } from '../../../core/models/employee/employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-create-magasin',
  templateUrl: './create-magasin.component.html',
  styleUrls: ['./create-magasin.component.css']
})
export class CreateMagasinComponent implements OnInit {

  magasin: Magasin = new Magasin();
  submitted = false;
  public employees: Employee[] = [];
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private magasinService: MagasinService, private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.getAllEmployee();
  }

  
  getAllEmployee() {
    this.employeeService.getEmployeesList().subscribe(res => {
      this.employees = res;
    });  
    }  
  newMagasin(): void {
    this.submitted = false;
    this.magasin = new Magasin();
  }

  save() {
    this.magasinService
    .createMagasin(this.magasin).subscribe(data => {
      console.log(data)
      this.magasin = new Magasin();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/magasins']);
  }

}
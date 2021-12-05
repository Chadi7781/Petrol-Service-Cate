import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MagasinService } from "../../../core/service/magasin/magasin.service";
import { Magasin } from '../../../core/models/magasin/magasin';
import { Employee } from  '../../../core/models/employee/employee';
import { EmployeeService } from '../../../core/service/employee/employee.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-update-magasin',
  templateUrl: './update-magasin.component.html',
  styleUrls: ['./update-magasin.component.css']
})
export class UpdateMagasinComponent implements OnInit {

  id: number;
  magasin: Magasin;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  public employees: Employee[] = [];


  constructor(private route: ActivatedRoute,private router: Router,private employeeService: EmployeeService,
    private magasinService: MagasinService) { }

  ngOnInit() {
    this.magasin = new Magasin();

    this.id = this.route.snapshot.params['id'];
    
    this.magasinService.getMagasin(this.id)
      .subscribe(data => {
        console.log(data)
        this.magasin = data;
      }, error => console.log(error));       

      this.getAllEmployee();
    }
  
    
    getAllEmployee() {
      this.employeeService.getEmployeesList().subscribe(res => {
        this.employees = res;
      });  
      }  

  updateMagasin() {
    this.magasinService.updateMagasin(this.id, this.magasin)
      .subscribe(data => {
        console.log(data);
        this.magasin = new Magasin();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateMagasin();    
  }

  gotoList() {
    this.router.navigate(['/magasins']);
  }
}

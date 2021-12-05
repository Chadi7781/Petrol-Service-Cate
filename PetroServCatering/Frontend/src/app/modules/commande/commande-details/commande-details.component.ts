import { CommandeService } from "../../../core/service/commande/commande.service";
import { Commande } from '../../../core/models/commande/commande';
import { Component, OnInit, Input } from '@angular/core';
import { CommandeListComponent } from '../commande-list/commande-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.css']
})
export class CommandeDetailsComponent implements OnInit {

  id: number;
  commande: Commande;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private route: ActivatedRoute,private router: Router,
    private commandeService: CommandeService) { }

  ngOnInit() {
    this.commande = new Commande();

    this.id = this.route.snapshot.params['id'];
    
    this.commandeService.getCommande(this.id)
      .subscribe(data => {
        console.log(data)
        this.commande = data;
        this.commande.date = new Date(data.date.slice(0, 10));
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['commandes']);
  }
}

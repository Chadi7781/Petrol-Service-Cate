import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateFournisseurComponent } from './create-fournisseur/create-fournisseur.component';
import { FournisseurDetailsComponent } from './fournisseur-details/fournisseur-details.component';
import { FournisseurListComponent } from './fournisseur-list/fournisseur-list.component';
import { UpdateFournisseurComponent } from './update-fournisseur/update-fournisseur.component';
import { CommonModule } from '@angular/common';
import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    CreateFournisseurComponent,
    FournisseurDetailsComponent,
    FournisseurListComponent,
    UpdateFournisseurComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    FormsModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule 
  ]
})
export class FournisseurModule { }

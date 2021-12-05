import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateFactureComponent } from './create-facture/create-facture.component';
import { FactureDetailsComponent } from './facture-details/facture-details.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import { UpdateFactureComponent } from './update-facture/update-facture.component';
import { CommonModule } from '@angular/common';
import { FactureRoutingModule } from './facture-routing.module';
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
import { GenererFactureComponent } from './generer-facture/generer-facture.component';

@NgModule({
  declarations: [
    CreateFactureComponent,
    FactureDetailsComponent,
    FactureListComponent,
    UpdateFactureComponent,
    GenererFactureComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    FactureRoutingModule,
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
export class FactureModule { }

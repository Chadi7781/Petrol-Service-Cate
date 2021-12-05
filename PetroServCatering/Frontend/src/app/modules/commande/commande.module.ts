import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCommandeComponent } from './create-commande/create-commande.component';
import { CommandeDetailsComponent } from './commande-details/commande-details.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { UpdateCommandeComponent } from './update-commande/update-commande.component';
import { CommandeValiderComponent } from './commande-valider/commande-valider.component';
import { CommonModule } from '@angular/common';
import { CommandeRoutingModule } from './commande-routing.module';
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
import { GenererCommandeComponent } from './generer-commande/generer-commande.component';
@NgModule({
  declarations: [
    CreateCommandeComponent,
    CommandeDetailsComponent,
    CommandeListComponent,
    UpdateCommandeComponent,
    CommandeValiderComponent,
    GenererCommandeComponent
  ],
  imports: [
    CommonModule,
    CommandeRoutingModule,
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
export class CommandeModule { }

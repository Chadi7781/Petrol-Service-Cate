import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateSousFamilleComponent } from './create-sousFamille/create-sousFamille.component';
import { SousFamilleDetailsComponent } from './sousFamille-details/sousFamille-details.component';
import { SousFamilleListComponent } from './sousFamille-list/sousFamille-list.component';
import { UpdateSousFamilleComponent } from './update-sousFamille/update-sousFamille.component';
import { SousFamilleRoutingModule } from './sousFamille-routing.module';
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
    CreateSousFamilleComponent,
    SousFamilleDetailsComponent,
    SousFamilleListComponent,
    UpdateSousFamilleComponent
  ],
  imports: [
    CommonModule,
    SousFamilleRoutingModule,
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
export class SousFamilleModule { }

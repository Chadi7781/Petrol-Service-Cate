import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateBonReceptionComponent } from './create-bonReception/create-bonReception.component';
import { BonReceptionDetailsComponent } from './bonReception-details/bonReception-details.component';
import { BonReceptionListComponent } from './bonReception-list/bonReception-list.component';
import { UpdateBonReceptionComponent } from './update-bonReception/update-bonReception.component';
import { CommonModule } from '@angular/common';
import { BonReceptionRoutingModule } from './bonReception-routing.module';
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
    CreateBonReceptionComponent,
    BonReceptionDetailsComponent,
    BonReceptionListComponent,
    UpdateBonReceptionComponent
  ],
  imports: [
    CommonModule,
    BonReceptionRoutingModule,
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
export class BonReceptionModule { }

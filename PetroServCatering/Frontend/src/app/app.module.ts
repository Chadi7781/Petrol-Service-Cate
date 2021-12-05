
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ConfirmationDialog } from "./modules/employee/employee-list/confirmation-dialog.component";
import { HttpClientModule } from "@angular/common/http";
import { SidebarModule } from "@syncfusion/ej2-angular-navigations";
import { PageLayoutComponent } from "./Core/page-layout/page-layout.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { LoginComponent } from "./Core/login/login.component";
import { RegisterComponent } from "./Core/register/register.component";
import { ProfileComponent } from "./Core/profile/profile.component";
import { CommonModule } from "@angular/common";
import { MatChipsModule } from "@angular/material/chips";
import { CreateTaxeComponent } from "./modules/taxes/create-taxe/create-taxe.component";
import { TaxesDetailsComponent } from "./modules/taxes/taxes-details/taxes-details.component";
import { UpdateTaxeComponent } from "./modules/taxes/update-taxe/update-taxe.component";

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    ConfirmationDialog,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreateTaxeComponent,
    TaxesDetailsComponent,
    UpdateTaxeComponent,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SidebarModule,

    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatChipsModule,
    CommonModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

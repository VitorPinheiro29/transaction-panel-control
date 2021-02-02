import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { AddButtonComponent } from './components/buttons/add-button/add-button.component';
import { CancelButtonComponent } from './components/buttons/cancel-button/cancel-button.component';
import { FilterButtonComponent } from './components/buttons/filter-button/filter-button.component';
import { ClearButtonComponent } from './components/buttons/clear-button/clear-button.component';
import { InputHelperComponent } from './components/input-helper/input-helper.component';

import { InputHelperDirective } from './directives/input-helper.directive';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { MatSnackBarModule } from '@angular/material/snack-bar';

registerLocaleData(localePtBr);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataTableComponent,
    NavbarComponent,
    AddTransactionComponent,
    AddButtonComponent,
    InputHelperDirective,
    InputHelperComponent,
    CancelButtonComponent,
    FilterButtonComponent,
    ClearButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule
  ],
  entryComponents: [
    AddTransactionComponent
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

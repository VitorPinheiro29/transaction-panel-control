import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from 'src/app/components/add-transaction/add-transaction.component';
import { HeaderModel } from 'src/app/models/header.model';
import { DataTableService } from 'src/app/services/data-table/data-table.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  filterForm: FormGroup;
  cardFilterOpened = false;
  establishment: any;

  headers: HeaderModel[] = [
    { text: 'Estabelecimento', value: 'establishment', type: 'cnpj' },
    { text: 'Cliente', value: 'client', type: 'cpf/cnpj' },
    { text: 'Valor', value: 'value', type: 'currency' },
    { text: 'Descrição', value: 'description', type: '' },
  ];

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public _transactionService: TransactionService,
    public _dataTableService: DataTableService,
    public _storageService: StorageService,
    public _notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this._dataTableService.refreshDataTable();
    this.loadForm();
  }

  loadForm() {
    this.filterForm = this._formBuilder.group({
      establishmentDocumentNumber: [''],
    })
  }

  loadData(page: number, limit: number) {
    return this._transactionService.getAllTransactions(page, limit);
  }  

  loadDataByFilter(establishment, page, limit) {
    return this._transactionService.getAllTransactionsByFilter(establishment, page, limit);
  }

  loadModel() {
    if (this.filterForm.valid) {
      this._storageService.set('filterValue', this.filterForm.get('establishmentDocumentNumber').value);
      this._dataTableService.refreshDataTable();
    }
  }

  getErrorMessage(controlName) {
    const control = this.filterForm.get(controlName);
    return control.hasError('required') ? 'Campo obrigatório' : control.hasError('mask') ? 'Campo incompleto' : ''
  }

  clearFilter() {
    this.filterForm.get('establishmentDocumentNumber').setValue('');
    this._storageService.clear();

    this._dataTableService.refreshDataTable();
  }

  createTransaction() {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(() => {
      let hasFilterValue = this._storageService.get('filterValue');
      if (hasFilterValue) {
        this._dataTableService.refreshDataTable();
      } else {
        this._storageService.clear();
        this._dataTableService.refreshDataTable();
      }
    });
  }

}

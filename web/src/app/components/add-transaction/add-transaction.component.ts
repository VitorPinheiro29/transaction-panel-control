import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  transactionForm: FormGroup;

  constructor (
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    private _transactionService: TransactionService,
    private _notificationService: NotificationService
    ) { }

  ngOnInit()  {
    this.transactionForm = new FormGroup({
      establishment: new FormControl(),
      client: new FormControl(),
      value: new FormControl(),
      description: new FormControl()
    })
  }

  getErrorMessage(controlName) {
    const control = this.transactionForm.get(controlName);
    return control.hasError('required') ? 'Campo obrigatório' : control.hasError('mask') ? 'Campo incompleto' : ''
  }

  closeDialog() {
    this.dialogRef.close(true);
  } 

  createTransaction(form) {
    if (this.transactionForm.valid) {
      this._transactionService.create(form).subscribe(() => {
        this._notificationService.success('Transação adicionada com sucesso');
      }, (error) => {
        this._notificationService.error('Ops, ocorreu um erro. Tente novamente ou contate o setor técnico')
      });
    
      this.dialogRef.close();
    }
  }

}

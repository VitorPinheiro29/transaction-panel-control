import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from 'src/app/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  requestUrl = 'http://localhost:3000/transactions';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _httpClient: HttpClient) { }

  // getAll() {
  //   return this._httpClient.get<Transaction>(this.requestUrl);
  // }

  private _mapTransactionResponse(data): { content: Transaction[] } {
    return data;
  }

  getAllTransactions(page: any, limit: number): Observable<any> {
    return this._httpClient.get<{content: Transaction[]}>(`${this.requestUrl}?_page=${page + 1}&_limit=${limit}`, {observe: 'response'}).pipe(
      map((data) => this._mapTransactionResponse(data))
    )
  }

  getAllTransactionsByFilter(establishment, page, limit): Observable<any> {
    return this._httpClient.get<{content: Transaction[]}>(`${this.requestUrl}?establishment=${establishment}&_page=${page + 1}&_limit=${limit}`, {observe: 'response'}).pipe(
      map((data) => this._mapTransactionResponse(data))
    )
  }

  create(transaction) {
    return this._httpClient.post<Transaction>(this.requestUrl, transaction);
  }
}

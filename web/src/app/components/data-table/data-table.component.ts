import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewChild,
  AfterViewInit,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HeaderModel } from 'src/app/models/header.model';
import { DataTableService } from 'src/app/services/data-table/data-table.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'establishment',
    'client',
    'value',
    'description',
  ];
  data: any;
  dataSource: any = new MatTableDataSource();
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  onRefreshDataTableSubscription: Subscription;

  @Input() headers: HeaderModel[] = [];
  @Input() async: boolean = true;
  @Input() loadFunction: any = new MatTableDataSource();
  @Input() filterFunction: any = new MatTableDataSource();
  @Input() clearFilterFunction: any = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _httpClient: HttpClient,
    public _transactionService: TransactionService,
    public _dataTableService: DataTableService,
    public _storageService: StorageService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._storageService.clear();
  }

  ngOnDestroy(): void {
    if (this.onRefreshDataTableSubscription) {
      this.onRefreshDataTableSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (this.async) {
      this._loadAsyncDataTable();
    }
  }

  pageEvents($event) {
    $event.pageIndex = $event.pageIndex
  }

  private _loadAsyncDataTable() {
    this.onRefreshDataTableSubscription = this._dataTableService
      .onRefreshDataTable()
      .subscribe(() => {
        this.isLoadingResults = true;

        if (this._storageService.get('filterValue')) {
          this.filterFunction(
            this._storageService.get('filterValue'),
            0,
            3
          ).subscribe((data) => {
            this.paginator.pageIndex = 0;
            this.isLoadingResults = false;
            this.resultsLength = data.headers.get('X-Total-Count');
            this.dataSource = new MatTableDataSource(data.body);
          });
        } else {
          this.loadFunction(this.paginator.pageIndex, 3).subscribe((data) => {
            this.resultsLength = data.headers.get('X-Total-Count');
            this.dataSource = new MatTableDataSource(data.body);
          });
        }
      });

    this.loadFunction(this.paginator.pageIndex, 3).subscribe((data) => {
      this.resultsLength = data.headers.get('X-Total-Count');
      this.dataSource = new MatTableDataSource(data.body);
    });

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          if (this._storageService.get('filterValue')) {
            return this._transactionService.getAllTransactionsByFilter(
              this._storageService.get('filterValue'),
              this.paginator.pageIndex,
              3
            );
          } else {
            return this._transactionService.getAllTransactions(
              this.paginator.pageIndex,
              3
            );
          }
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.headers.get('X-Total-Count');

          return data.body;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }
}

import { LogService } from './../../services/log.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject, merge } from 'rxjs';
import { LogFilter } from '../../models/log-filter.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { LogDataModel } from '../../models/log-data.model';
import { LogInfoModel } from '../../models/log-info.model';
import { ActivatedRoute, Router } from '@angular/router';
// import { LogTableDataSource, LogTableItem } from './log-table-datasource';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss']
})
export class LogTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  // dataSource: LogTableDataSource;

  logSize = 50;
  logFilter: LogFilter = {
    search: null,
    sortBy: null,
    sortDirection: null,
    pageNumber: 0,
    pageSize: 10
  };
  searchLog: FormControl = new FormControl(null);
  // Demo = [
  //   {fullName: 'fullName1', email: 'a@a.com', phone: 11111, uid: '9jd33k'},
  //   {fullName: 'fullName2', email: 'a@a.com', phone: 22222, uid: '9jd33k'},
  //   {fullName: 'fullName3', email: 'a@a.com', phone: 33333, uid: '9jd33k'},
  //   {fullName: 'fullName4', email: 'a@a.com', phone: 1114444411, uid: '9jd33k'},
  // ]
  Demo = [];

  dataTable = new BehaviorSubject<LogInfoModel[]>(this.Demo);

  constructor(
    private logService: LogService,
    private router: Router
  ) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fullName', 'email', 'phone', 'edit'];

  ngOnInit(): void {
    // this.dataSource = new LogTableDataSource();
    this.logService.getLogInfo(this.logFilter)
      .subscribe((data: LogDataModel) => {
        console.log(data);
        this.logSize = data.length;
        this.dataTable.next(data.log);
      });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange
      .subscribe(data => {
        this.logFilter.sortBy = data.active;
        this.logFilter.sortDirection = data.direction;
      });

    this.paginator.page
      .subscribe(data => {
        this.logFilter.pageNumber = data.pageIndex;
        this.logFilter.pageSize = data.pageSize;
      });

    this.searchLog.valueChanges
      .subscribe(data => {
        this.logFilter.search = data;
      });

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.searchLog.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
    )).pipe(
        switchMap(e => {
          console.log(e);
          return this.logService.getLogInfo(this.logFilter);
        })
    ).subscribe((data: LogDataModel) => {
        console.log(data.log);
        this.logSize = data.length;
        this.dataTable.next(data.log);

      });
  }

  goEditingInfo(uid: string, event: any): void {
    console.log(uid);
    event.stopPropagation();
    this.router.navigate(['/_/edit-info', uid]);
  }

  viewFullInfo(uid: string): void {
    console.log(uid);
    this.router.navigate(['/full-info', uid]);
  }
}

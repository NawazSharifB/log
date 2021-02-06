import { switchMap } from 'rxjs/operators';
import { FullInfoService } from './../../services/full-info.service';
import { FullInfoModel } from '../../../app-common-shared/model/full-info.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-full-info',
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.scss']
})
export class FullInfoComponent implements OnInit {

  userInfo: FullInfoModel = {
    uid: 'string',
    firstName: 'string',
    lastName: 'string',
    age: 12,
    sex: 'string',
    occupation: 'string',
    institutation: 'string',
    contactInfo: {
        phone: 2123,
        email: 'string',
    },
    address: {
        road: 'string',
        holding: 'string',
        post: 'string',
        postCode: 234,
        district: 'string',
        city: 'string',
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fullInfoService: FullInfoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(data => {
        if (data.has('id')) {
          const id = data.get('id');
          return this.fullInfoService.getFullInfo(id);
        }
        // const error = new Error('Id was\'t provided');
        // error['status'] = 1000;
        const error = {
          message: 'Id was\'t provided',
          status: 1000
        };
        return throwError(error);
      })
    ).subscribe(data => {
      this.userInfo = data;
    }, error => {
      if (error.status === 1000 || error.status === 400) {
        return this.router.navigate(['/not-found']);
      }
      return this.router.navigate(['/server-error']);
    });
  }

}

import { ChangeDetectorRef, Component } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'log';
  private mediaSub: Subscription;
  
  constructor(
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver,
  ) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe( (change: MediaChange[]) => {
      console.log(change[0].mqAlias);
    });
  }
  
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-utility',
  templateUrl: './shared-utility.component.html',
  styleUrls: ['./shared-utility.component.scss']
})
export class SharedUtilityComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  isLoadingSecond: boolean = false;
  subscription: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription.forEach(x => x.unsubscribe());
  }
}

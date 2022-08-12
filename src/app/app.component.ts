import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
  
interface Website {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular12app';

  protected websites: Website[] = [
    {id: '1', name: 'ItSolutionStuff.com'},
    {id: '2', name: 'HDTuto.com'},
    {id: '3', name: 'Nicesnippets.com'},
    {id: '4', name: 'Google.com'},
    {id: '5', name: 'laravel.com'},
    {id: '6', name: 'npmjs.com'},
  ];
  
  public websiteCtrl: FormControl = new FormControl();
  public websiteFilterCtrl: FormControl = new FormControl();
  public filteredWebsites: ReplaySubject<number> = new ReplaySubject(1);

  
  // @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  
  protected _onDestroy = new Subject();

  constructor() {}
  
  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnInit() {
    // this.singleSelect = new MatSelect<MatSelectChange>()
    this.websiteCtrl.setValue(this.websites[1]);
    // this.filteredWebsites.next(this.websites.slice());
  
    this.websiteFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
  }
  
  /**
   * Write code on Method
   *
   * method logical code
   */
  ngAfterViewInit() {
    this.setInitialValue();
  }
  
  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnDestroy() {
    // this._onDestroy.next();
    this._onDestroy.complete();
  }
  
  /**
   * Write code on Method
   *
   * method logical code
   */
  protected setInitialValue() {
    this.filteredWebsites
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
          // this.singleSelect.compareWith = (a: Website, b: Website) => a && b && a.id === b.id;
      });
  }
  
  /**
   * Write code on Method
   *
   * method logical code
   */
  protected filterBanks() {
    if (!this.websites) {
      return;
    }
  
    let search = this.websiteFilterCtrl.value;
    if (!search) {
      // this.filteredWebsites.next(this.websites.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
  
    // this.filteredWebsites.next(
    //   this.websites.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    // );
  }
}

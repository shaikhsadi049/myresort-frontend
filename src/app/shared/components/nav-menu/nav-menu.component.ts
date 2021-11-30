import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavService } from '../../services/nav-menu.service';
import { NavItem } from '../../models/nav.item';
import { AsyncService } from '../../services/async.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appDrawer') appDrawer: ElementRef | any;
  version = VERSION;
  isLoading = false;
  asyncSub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  navItems: NavItem[] = [
    {
      displayName: 'Resort',
      iconName: 'attractions',
      children: [
        {
          displayName: 'Resort List',
          iconName: 'checklist',
          route: '/resort',
        },
        {
          displayName: 'Resort ADD',
          iconName: 'add_circle_outline',
          route: '/resort/add',
        },
      ],
    },
    {
      displayName: 'Room',
      iconName: 'king_bed',
      children: [
        {
          displayName: 'Room List',
          iconName: 'format_list_bulleted',
          route: '/room',
        },
        {
          displayName: 'Room ADD',
          iconName: 'add_circle',
          route: '/room/add',
        },
      ],
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private asyncService: AsyncService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.asyncSub = this.asyncService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  ngOnDestroy() {
    if (this.asyncSub) {
      this.asyncSub.unsubscribe();
    }
  }
}

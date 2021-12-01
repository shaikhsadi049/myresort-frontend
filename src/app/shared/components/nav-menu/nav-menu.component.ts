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
import { Observable, of, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavService } from '../../services/nav-menu.service';
import { NavItem } from '../../models/nav.item';
import { AsyncService } from '../../services/async.service';
import { UIInfo } from '../../models/ui-info.model';
import { CommonService } from '../../services/common.service';

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

  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean> = of(false);
  isFullScreen = false;
  uiInfo: UIInfo;
  // navItems: NavItem[] = NavigationList.items;
  // @Input() navItems: NavItem;
  private authSub: Subscription;
  private uiInfoSub: Subscription;
  worklist: any;

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
    private changeDetectorRef: ChangeDetectorRef,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    // this.isLoggedIn$ = this.authService.isLoggedIn;
    this.uiInfoSub = this.commonService.uiInfo.subscribe((uiInfo) => {
      this.uiInfo = uiInfo;
      this.changeDetectorRef.detectChanges();
    });

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

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.goFullScreen();
    } else {
      this.exitFullScreen();
    }
  }

  private goFullScreen(): void {
    const docElm = document.documentElement as any;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  }

  private exitFullScreen(): void {
    const doc = document as any;
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }
}

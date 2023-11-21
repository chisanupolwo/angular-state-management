import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar, AvatarService } from './data-access/avatar-service.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { AvatarPaginateService } from './data-access/avatar-paginate.service';

@Component({
  selector: 'nx-angular-new-error-service',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './avatar-service.component.html',
  styleUrls: ['./avatar-service.component.scss'],
})
export class ErrorServiceComponent implements OnInit {

  // avatarService = inject(AvatarService)
  avatarService = inject(AvatarPaginateService)

  ngOnInit(): void {
    console.log('On init')
    // this.avatarService.load$.next(true);
    this.avatarService.pagination$.next();
  }

  reloadData() {
    console.log('Reload data')
    // this.avatarService.load$.next(true);
  }

  nextPage() {
    this.avatarService.pagination$.next()
  }

  itemPage() {
    this.avatarService.updateItemPage$.next(20)
  }
}

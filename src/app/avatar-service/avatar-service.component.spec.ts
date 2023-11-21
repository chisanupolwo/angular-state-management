import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorServiceComponent } from './avatar-service.component';

describe('ErrorServiceComponent', () => {
  let component: ErrorServiceComponent;
  let fixture: ComponentFixture<ErrorServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

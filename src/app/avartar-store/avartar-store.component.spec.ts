import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvartarStoreComponent } from './avartar-store.component';

describe('AvartarStoreComponent', () => {
  let component: AvartarStoreComponent;
  let fixture: ComponentFixture<AvartarStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvartarStoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvartarStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

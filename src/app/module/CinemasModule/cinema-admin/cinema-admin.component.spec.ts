import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaAdminComponent } from './cinema-admin.component';

describe('CinemaAdminComponent', () => {
  let component: CinemaAdminComponent;
  let fixture: ComponentFixture<CinemaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

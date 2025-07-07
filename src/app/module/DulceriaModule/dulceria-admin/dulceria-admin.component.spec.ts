import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulceriaAdminComponent } from './dulceria-admin.component';

describe('DulceriaAdminComponent', () => {
  let component: DulceriaAdminComponent;
  let fixture: ComponentFixture<DulceriaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulceriaAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DulceriaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

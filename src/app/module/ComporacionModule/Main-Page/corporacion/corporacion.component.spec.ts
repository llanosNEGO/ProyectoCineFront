import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporacionComponent } from './corporacion.component';

describe('CorporacionComponent', () => {
  let component: CorporacionComponent;
  let fixture: ComponentFixture<CorporacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

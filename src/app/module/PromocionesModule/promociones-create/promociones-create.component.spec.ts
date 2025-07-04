import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionesCreateComponent } from './promociones-create.component';

describe('PromocionesCreateComponent', () => {
  let component: PromocionesCreateComponent;
  let fixture: ComponentFixture<PromocionesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocionesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioCardComponent } from './socio-card.component';

describe('SocioCardComponent', () => {
  let component: SocioCardComponent;
  let fixture: ComponentFixture<SocioCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocioCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocioCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

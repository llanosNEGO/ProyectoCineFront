import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulceriaCardComponent } from './dulceria-card.component';

describe('DulceriaCardComponent', () => {
  let component: DulceriaCardComponent;
  let fixture: ComponentFixture<DulceriaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulceriaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DulceriaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

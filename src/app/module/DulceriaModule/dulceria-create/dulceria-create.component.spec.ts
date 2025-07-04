import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulceriaCreateComponent } from './dulceria-create.component';

describe('DulceriaCreateComponent', () => {
  let component: DulceriaCreateComponent;
  let fixture: ComponentFixture<DulceriaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulceriaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DulceriaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

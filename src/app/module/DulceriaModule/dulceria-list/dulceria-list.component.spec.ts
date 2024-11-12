import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulceriaListComponent } from './dulceria-list.component';

describe('DulceriaListComponent', () => {
  let component: DulceriaListComponent;
  let fixture: ComponentFixture<DulceriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulceriaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DulceriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

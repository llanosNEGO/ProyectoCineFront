import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DulceriaEditComponent } from './dulceria-edit.component';

describe('DulceriaEditComponent', () => {
  let component: DulceriaEditComponent;
  let fixture: ComponentFixture<DulceriaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DulceriaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DulceriaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

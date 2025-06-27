import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionSitiosComponent } from './selecion-sitios.component';

describe('SelecionSitiosComponent', () => {
  let component: SelecionSitiosComponent;
  let fixture: ComponentFixture<SelecionSitiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionSitiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionSitiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

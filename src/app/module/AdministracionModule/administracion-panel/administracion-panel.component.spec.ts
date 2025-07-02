import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionPanelComponent } from './administracion-panel.component';

describe('AdministracionPanelComponent', () => {
  let component: AdministracionPanelComponent;
  let fixture: ComponentFixture<AdministracionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

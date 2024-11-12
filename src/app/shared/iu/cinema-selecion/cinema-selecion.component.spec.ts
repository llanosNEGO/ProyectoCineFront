import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaSelecionComponent } from './cinema-selecion.component';

describe('CinemaSelecionComponent', () => {
  let component: CinemaSelecionComponent;
  let fixture: ComponentFixture<CinemaSelecionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CinemaSelecionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaSelecionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

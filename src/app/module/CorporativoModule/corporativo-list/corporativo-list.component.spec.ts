import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporativoListComponent } from './corporativo-list.component';

describe('CorporativoListComponent', () => {
  let component: CorporativoListComponent;
  let fixture: ComponentFixture<CorporativoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporativoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporativoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

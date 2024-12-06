import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeFinancialComponent } from './life-financial.component';

describe('LifeFinancialComponent', () => {
  let component: LifeFinancialComponent;
  let fixture: ComponentFixture<LifeFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifeFinancialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

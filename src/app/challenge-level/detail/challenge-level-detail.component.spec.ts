import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeLevelDetailComponent } from './challenge-level-detail.component';

describe('ChallengeLevelDetailComponent', () => {
  let component: ChallengeLevelDetailComponent;
  let fixture: ComponentFixture<ChallengeLevelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeLevelDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChallengeLevelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChallengeLevelListComponent} from './challenge-level-list.component';

describe('ChallengeLevelListComponent', () => {
  let component: ChallengeLevelListComponent;
  let fixture: ComponentFixture<ChallengeLevelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeLevelListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

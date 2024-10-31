import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerDetailComponent } from './sticker-detail.component';

describe('StickerDetailComponent', () => {
  let component: StickerDetailComponent;
  let fixture: ComponentFixture<StickerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StickerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

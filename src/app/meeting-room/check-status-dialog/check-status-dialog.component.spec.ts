import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStatusDialogComponent } from './check-status-dialog.component';

describe('CheckStatusDialogComponent', () => {
  let component: CheckStatusDialogComponent;
  let fixture: ComponentFixture<CheckStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckStatusDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

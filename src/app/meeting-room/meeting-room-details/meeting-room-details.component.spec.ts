import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomDetailsComponent } from './meeting-room-details.component';

describe('MeetingRoomDetailsComponent', () => {
  let component: MeetingRoomDetailsComponent;
  let fixture: ComponentFixture<MeetingRoomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingRoomDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingRoomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

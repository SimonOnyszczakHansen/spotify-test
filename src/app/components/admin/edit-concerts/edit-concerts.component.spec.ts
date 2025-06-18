import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConcertsComponent } from './edit-concerts.component';

describe('EditConcertsComponent', () => {
  let component: EditConcertsComponent;
  let fixture: ComponentFixture<EditConcertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConcertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditConcertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

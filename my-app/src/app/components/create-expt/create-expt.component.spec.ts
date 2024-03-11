import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExptComponent } from './create-expt.component';

describe('CreateExptComponent', () => {
  let component: CreateExptComponent;
  let fixture: ComponentFixture<CreateExptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateExptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

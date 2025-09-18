import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniformeComponent } from './components/uniforme.component';

describe('UniformeComponent', () => {
  let component: UniformeComponent;
  let fixture: ComponentFixture<UniformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniformeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

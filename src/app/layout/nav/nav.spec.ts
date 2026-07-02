import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav } from './nav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('NavComponent', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Nav],
      imports: [MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

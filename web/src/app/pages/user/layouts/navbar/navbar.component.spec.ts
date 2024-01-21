import { NavbarComponent } from './navbar.component'
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StateCartService } from 'src/app/services/state-cart.service';

describe('AppComponent', () => {
    // let fixture:HomeComponent;
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [NavbarComponent],
          imports: [HttpClientTestingModule,StateCartService], // Import the HttpClientTestingModule
        }).compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create the app', () => {
        expect(component).toBeTruthy();
      });
    
      it('should have a title "home"', () => {
        expect(component.title).toEqual('navbar');
      });
  })

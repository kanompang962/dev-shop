import { AboutComponent } from './about.component'

describe('AppComponent', () => {
    let fixture:AboutComponent;

    beforeEach(() => {
      fixture = new AboutComponent();
    })

    it('should have a title newapp', ()=> {
      expect(fixture.title).toEqual('about');
    })
  })


import { AdminComponent } from './admin.component'

describe('AppComponent', () => {
    let fixture:AdminComponent;

    beforeEach(() => {
      fixture = new AdminComponent();
    })

    it('should have a title newapp', ()=> {
      expect(fixture.title).toEqual('admin');
    })
  })


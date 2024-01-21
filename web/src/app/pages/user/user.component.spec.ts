import { UserComponent } from './user.component'

describe('AppComponent', () => {
    let fixture:UserComponent;

    beforeEach(() => {
      fixture = new UserComponent();
    })

    it('should have a title newapp', ()=> {
      expect(fixture.title).toEqual('user');
    })
  })

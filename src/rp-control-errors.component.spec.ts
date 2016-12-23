import {RpControlErrorsComponent} from './rp-control-errors.component';

describe('RpControlErrorsComponent', () => {
  const settings = {
    errors: {
      required: 'This field is required',
    },
  };

  const messagesInput = {
    required: 'This field is needed',
  };

  let component: RpControlErrorsComponent;

  beforeEach(() => {
    component = new RpControlErrorsComponent(settings as any);

    component.errors = {required: true};
  });

  it('should get messages for any input errors', () => {
    expect(component.errorMessages[0]).toBe(settings.errors.required);
  });

  it('should combine input messages with settings messages', () => {
    component.messages = messagesInput;
    expect(component.errorMessages[0]).toBe(messagesInput.required);
  });

  it('should return the error code if no message is found', () => {
    const error = 'unknownError';
    component.errors = {[error]: true};
    expect(component.errorMessages[0]).toBe(error);
  });

  xit('should display a list of error messages', () => {});
});

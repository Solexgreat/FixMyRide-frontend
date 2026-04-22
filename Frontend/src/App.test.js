import { validatePhoneNumber } from './utils/validationUtils';

test('accepts a valid 10-digit phone number', () => {
  expect(validatePhoneNumber('1234567890')).toBe(true);
});

test('rejects an invalid phone number', () => {
  expect(validatePhoneNumber('12345')).toBe(false);
});

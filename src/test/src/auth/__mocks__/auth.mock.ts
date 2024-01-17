import { Request } from 'express';
import { UserMock } from '../../users/__mocks__/user.mock';
import { UserRequest } from 'src/common/interfaces/userRequest.interfaces';

export const AuthMock = {
  username: 'test',
  email: 'test@test.com.ar',
  password: '1234test',
};

export const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const req: UserRequest = {
  user: {
    id: 'string',
    username: 'test',
    role: 'user'
  },
  cache: 'default',
  credentials: 'include',
  destination: '',
  headers: undefined,
  integrity: '',
  keepalive: false,
  method: '',
  mode: 'same-origin',
  redirect: 'error',
  referrer: '',
  referrerPolicy: '',
  signal: undefined,
  url: '',
  clone: function (): globalThis.Request {
    throw new Error('Function not implemented.');
  },
  body: undefined,
  bodyUsed: false,
  arrayBuffer: function (): Promise<ArrayBuffer> {
    throw new Error('Function not implemented.');
  },
  blob: function (): Promise<Blob> {
    throw new Error('Function not implemented.');
  },
  formData: function (): Promise<FormData> {
    throw new Error('Function not implemented.');
  },
  json: function (): Promise<any> {
    throw new Error('Function not implemented.');
  },
  text: function (): Promise<string> {
    throw new Error('Function not implemented.');
  }
}

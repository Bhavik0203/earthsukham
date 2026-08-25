import { fetchApi } from './api';

export interface WebUser {
  id: string;
  name: string;
  email: string;
  number: string;
}

export const registerWebUser = async (data: any): Promise<WebUser> => {
  return fetchApi('/web-users/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const loginWebUser = async (data: any): Promise<WebUser> => {
  return fetchApi('/web-users/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const forgotPasswordWebUser = async (email: string): Promise<{ message: string }> => {
  return fetchApi('/web-users/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

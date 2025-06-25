import { ApiClient } from '@repo/utils/apiClient';

import { BASE_URL } from '../constants/api';

export const apiClientInstance = new ApiClient(BASE_URL);

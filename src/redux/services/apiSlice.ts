import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setLogout } from '../features/authSlice';
import { Mutex } from 'async-mutex';
import { toast } from 'react-toastify';
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
  credentials: 'include', 
  headers:{'Accept-Language': localStorage.getItem("lang") || 'ar'}
});


const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // ✅ في حالة انتهاء صلاحية الـ access token
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // ⚙️ أطلب refresh بدون body (الكوكي هي اللي فيها الـ refresh token)
        const refreshResult = await baseQuery(
          { url: '/users/jwt/refresh/', method: 'POST' },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // ✅ أعد تنفيذ الطلب الأصلي بعد التجديد
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(setLogout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result.error && result.error.status === 403) {
    toast.error("You don't have permissions to proceed with this action");
    history.back();
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'users',
    'roles-permissions',
    'roles',
    'notification-center',
    'notification-templates',
  ],
  endpoints: () => ({}),
});

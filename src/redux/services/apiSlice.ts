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
import Cookies from "js-cookie"



const baseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_BASE_URL}/api/`,
	credentials: 'include',
	headers:{'Accept-Language':localStorage.getItem("lang")||'ar'}
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult: any = await baseQuery(
          { url: "/users/jwt/refresh/", method: "POST", body:{refresh:Cookies.get('refresh_token')} },
          api,
          extraOptions
        );
		
        if (refreshResult.data) {
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
	endpoints: () => ({}),
	tagTypes: [
		'users', 
		'roles-permissions',
		'roles',

		
		'notification-center',
		'notification-templates',
	],
});
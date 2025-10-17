import { useEffect } from 'react';
import Cookies from "js-cookie"
import { useAppDispatch } from '../../../redux/hooks';
import { useVerifyMutation } from '../../../redux/features/authApiSlice';
import { finishInitialLoad, setLogout } from '../../../redux/features/authSlice';

export default function useVerify() {
	const dispatch = useAppDispatch();

	const [verify] = useVerifyMutation();

	useEffect(() => {
		verify(undefined)
			.unwrap()
			.then((data:{access:string}) => {
				if(data?.access)
					Cookies.set('access_token', data?.access, {expires: new Date(new Date().getTime() + 72 * 60 * 60 * 1000)})
			})
			.catch(()=>{
				dispatch(setLogout())
				
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});		
	}, [dispatch, verify]);
}
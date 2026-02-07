'use client';

import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConnectivityListener from '../Components/utils/ConnectivityListener';

interface Props {
	children: React.ReactNode;
}

export default function CustomProvider({ children }: Props) {
	return (
		<Provider store={store}>
			<ConnectivityListener />
			<ToastContainer />
			{children}
		</Provider>
	);
}
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerify } from '../Hooks/Auth';

export default function Setup() {
	useVerify();
	return <ToastContainer />;
}
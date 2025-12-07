import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useVerify } from '../ui/Hooks/Auth';

export default function Setup() {
	useVerify();
	return <ToastContainer />;
}
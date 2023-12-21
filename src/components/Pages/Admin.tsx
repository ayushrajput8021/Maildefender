// import AccTable from '../AccTable';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../Heading';
import { Button } from "@/components/ui/button"

export default function Admin() {
	const navigate = useNavigate();
	function accHandler(){
		navigate('/acc-data')
	}
	function maildataHandler(){
		navigate('/mail-data')
	}
	function trainHandler(){
		navigate('/train')
	}
	return (
		<div>
			<Heading text={'Admin Panel'}/>
			<Button variant="secondary" size={'lg'} className='mr-5' onClick={accHandler}>Accuracy Data</Button>
			<Button variant="secondary" size={'lg'} className='mr-5' onClick={trainHandler}>Train Model</Button>
			<Button variant="secondary" size={'lg'} onClick={maildataHandler}>New Mails Data</Button>
		</div>
	);
}

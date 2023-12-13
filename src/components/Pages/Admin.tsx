// import AccTable from '../AccTable';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../Heading';
import { Button } from "@/components/ui/button"

export default function Admin() {
	const navigate = useNavigate();
	function accHandler(){
		navigate('/acc-data')
	}
	return (
		<div>
			<Heading text={'Admin Panel'}/>
			<Button variant="secondary" size={'lg'} className='mr-5' onClick={accHandler}>Accuracy Data</Button>
			<Button variant="secondary" size={'lg'} className='mr-5' >Train Model</Button>
			<Button variant="secondary" size={'lg'} >New Mails Data</Button>
		</div>
	);
}

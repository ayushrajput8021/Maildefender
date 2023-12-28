// import AccTable from '../AccTable';
import { useNavigate } from 'react-router-dom';
import { Heading } from '../Heading';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface AccTableProps {
	username: string;
	password: string;
}

export default function Admin({ username, password }: AccTableProps) {
	const navigate = useNavigate();

	useEffect(
		function () {
			if (!username && !password) {
				navigate('/login');
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[password, username]
	);
	function accHandler() {
		navigate('/acc-data');
	}
	function maildataHandler() {
		navigate('/mail-data');
	}
	function trainHandler() {
		navigate('/train');
	}
	function homeHandler() {
		navigate('/');
	}
	return (
		<div>
			<Heading text={'Admin Panel'} />
			<Button
				variant='secondary'
				size={'lg'}
				className='mr-5'
				onClick={accHandler}
			>
				Accuracy Data
			</Button>
			<Button
				variant='secondary'
				size={'lg'}
				className='mr-5'
				onClick={trainHandler}
			>
				Train Model
			</Button>
			<Button
				variant='secondary'
				size={'lg'}
				className='mr-5'
				onClick={maildataHandler}
			>
				New Mails Data
			</Button>
			<Button variant='secondary' size={'lg'} onClick={homeHandler}>
				Home
			</Button>
		</div>
	);
}

import { useState, useEffect } from 'react';
import { Heading } from '../Heading';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
interface TrainProps {
	username: string;
	password: string;
}

export default function Train({ username, password }: TrainProps) {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (!username && !password) {
			navigate('/login');
		}
		const fetchData = async () => {
			try {
				const data = { username, password };
				setLoading(true);
				const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/train', {
					method: 'POST',
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!res.ok) {
					throw new Error('Failed to fetch data');
				}

				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username, password]);
	return (
		<>
			<Heading text='Train Model' />
			{loading ? (
				<h2>Wait training is in progress...</h2>
			) : (
				<div>
					<h2>Model is trained</h2>
					<Button variant='outline' onClick={() => navigate('/admin')} className={'mt-8'}>
						Admin Panel
					</Button>
				</div>
			)}
		</>
	);
}

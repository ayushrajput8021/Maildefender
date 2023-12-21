import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from '../Heading';
import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
	setUsername: React.Dispatch<SetStateAction<string>>;
	setPassword: React.Dispatch<SetStateAction<string>>;
	username: string;
	password: string;
}

export default function Login({
	setPassword,
	setUsername,
	username,
	password,
}: LoginProps) {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	async function loginHandler() {
		try {
			setLoading(true);
			const data = { username, password };
			const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}

			const resData = await res.json();
			setLoading(false);
			if (resData.Status === 'Authenticated') navigate('/admin');
		} catch (error) {
			console.error('Error fetching auth:', error);
		}
	}

	return (
		<>
			<Heading text='Admin Login' />
			<Button
				variant='outline'
				onClick={() => navigate('/')}
			>Home</Button>
			<Card className='mt-16 w-72'>
				<CardContent className='grid gap-4 pt-6'>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Username</Label>
						<Input
							id='email'
							type='email'
							placeholder='Username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</CardContent>
				<CardFooter>
					{loading ? (
						<Button className='w-full' variant='outline' disabled>
							Wait
						</Button>
					) : (
						<Button
							className='w-full'
							variant='outline'
							id='login-btn'
							onClick={() => loginHandler()}
						>
							Login
						</Button>
					)}
				</CardFooter>
			</Card>
		</>
	);
}

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Heading } from './Heading';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface MailData {
	Message: string;
	Category: number;
}
interface AccTableProps{
	username:string;
	password:string;
}
export default function AccTable({username,password}:AccTableProps) {
	const navigate = useNavigate();
	const [data, setData] = useState<MailData[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!username && !password) {
			navigate('/login');
		}
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(
					import.meta.env.VITE_BACKEND_URL + '/get_temp',
					{
						method: 'GET',
					}
				);

				if (!res.ok) {
					throw new Error('Failed to fetch data');
				}

				const resData = await res.json();
				setLoading(true);
				setData(resData);
				// console.log(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Heading text={'New Mails'} />
			{loading ? null : <h2 className='text-center'>Loading... Please Wait</h2>}
			<Button variant='outline' onClick={() => navigate('/admin')}>
				Admin Panel
			</Button>
			<Table className='w-fit mt-8'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[50px]'>Id</TableHead>
						<TableHead className='w-[100px]'>Message</TableHead>
						<TableHead className='w-[100px]'>Category</TableHead>
						<TableHead className='w-[100px]'>Mail is:</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item, i) => (
						<TableRow key={i} className='text-center'>
							<TableCell className='font-medium'>{i + 1}</TableCell>
							<TableCell>{item.Message}</TableCell>
							<TableCell>{item.Category}</TableCell>
							<TableCell>{item.Category ? 'Not Spam' : 'Spam'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

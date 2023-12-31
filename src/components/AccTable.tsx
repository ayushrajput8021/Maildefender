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

interface AccData {
	Date: string;
	Time: string;
	Accuracy_Train: number;
	Accuracy_Test: number;
	Train_size: number;
	Test_size: number;
}

interface AccTableProps{
	username:string;
	password:string;
}

export default function AccTable({username,password}:AccTableProps) {
	const navigate = useNavigate();
	const [data, setData] = useState<AccData[]>([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (!username && !password) {
			navigate('/login');
		}
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/get-acc', {
					method: 'GET',
				});

				if (!res.ok) {
					throw new Error('Failed to fetch data');
				}

				const resData = await res.json();
				setLoading(false);
				setData(resData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Heading text={'Accuracy Data'} />
			{loading ? <h2 className='text-center'>Loading... Please Wait</h2> : null}
			<Button variant='outline' onClick={() => navigate('/admin')}>
				Admin Panel
			</Button>
			<Table className='w-fit mt-8'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[50px]'>Id</TableHead>
						<TableHead className='w-[100px]'>Date</TableHead>
						<TableHead className='w-[100px]'>Time</TableHead>
						<TableHead className='w-[110px]'>Accuracy Train</TableHead>
						<TableHead className='w-[110px] text-center'>
							Accuracy Test
						</TableHead>
						<TableHead className='w-[80px]'>Train Size</TableHead>
						<TableHead className='w-[80px]'>Test Size</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item, i) => (
						<TableRow key={i} className='text-center'>
							<TableCell className='font-medium'>{i + 1}</TableCell>
							<TableCell>{item.Date}</TableCell>
							<TableCell>{item.Time}</TableCell>
							<TableCell>
								<em>{item.Accuracy_Train}%</em>
							</TableCell>
							<TableCell>{item.Accuracy_Test}%</TableCell>
							<TableCell>{item.Train_size}</TableCell>
							<TableCell>{item.Test_size}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

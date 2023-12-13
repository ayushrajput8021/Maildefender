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

interface AccData {
	created_at: string;
	Accuracy_Train: number;
	Accuracy_Test: number;
	Train_size: number;
	Test_size: number;
}

export default function AccTable() {
	const [data, setData] = useState<AccData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/get-acc', {
					method: 'GET',
				});

				if (!res.ok) {
					throw new Error('Failed to fetch data');
				}

				const resData = await res.json();
				setData((prevData) => [...prevData, resData]);
				// console.log(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<Heading text={'Accuracy Data'} />
			<Table className='w-fit mt-8'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[50px]'>Id</TableHead>
						<TableHead className='w-[100px]'>Created At</TableHead>
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
							<TableCell>{item.created_at}</TableCell>
							<TableCell><em>{item.Accuracy_Train}%</em></TableCell>
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

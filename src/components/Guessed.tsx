import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { CrossCircledIcon } from '@radix-ui/react-icons';

interface GuessedProps {
	guessHandler: () => void;
	spam: boolean;
	mail: string;
}

export default function Guessed({ guessHandler, spam, mail }: GuessedProps) {
	const [choice, setChoice] = useState<boolean>();
	const isFirstRender = useRef(true);
	async function reqHandler(ch: boolean) {
		try {
			const data = { Message: mail, Category: ch ? '1' : '0' };
			const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/add-temp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
		} catch (error) {
			console.error('Error fetching auth:', error);
		}
		guessHandler();
	}
	useEffect(
		function choiceHandler() {
			if (isFirstRender.current) {
				isFirstRender.current = false;
				return;
			}
			if (choice !== spam) {
				reqHandler(true);
			} else {
				reqHandler(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[choice]
	);

	return (
		<div className={'border rounded p-5 border-cyan-50 border-solid mt-2'}>
			<div className={'flex flex-row '}>
				<p className={'mb-3'}>Does Mail Defender guessed it right ?</p>
				<CrossCircledIcon
					className={'ml-24 mb-5 cursor-pointer'}
					onClick={() => guessHandler()}
				/>
			</div>
			<Button
				className={'mr-3'}
				variant='destructive'
				size='lg'
				onClick={() => setChoice(() => true)}
			>
				Yes
			</Button>
			<Button
				className={'mr-3'}
				size='lg'
				variant='secondary'
				onClick={() => setChoice(() => false)}
			>
				No
			</Button>
			<Button size='lg' variant='outline' onClick={() => guessHandler()}>
				Don't know
			</Button>
		</div>
	);
}

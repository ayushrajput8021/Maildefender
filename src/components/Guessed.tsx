import { Button } from './ui/button';
import { CrossCircledIcon } from '@radix-ui/react-icons';

interface GuessedProps {
	guessHandler: () => void;
}

export default function Guessed({ guessHandler }: GuessedProps) {
	return (
		<div className={'border rounded p-5 border-cyan-50 border-solid mt-2'}>
			<div className={'flex flex-row '}>
				<p className={'mb-3'}>Does Mail Defender guessed it right ?</p>
				<CrossCircledIcon
					className={'ml-24 mb-5 cursor-pointer'}
					onClick={() => guessHandler()}
				/>
			</div>
			<Button className={'mr-3'} variant='destructive' size='lg'>
				Yes
			</Button>
			<Button className={'mr-3'} size='lg' variant='secondary'>
				No
			</Button>
			<Button size='lg' variant='outline' onClick={() => guessHandler()}>
				Don't know
			</Button>
		</div>
	);
}

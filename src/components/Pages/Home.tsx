import { useEffect, useState } from 'react';

import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Heading } from '../../components/Heading';

import Spam from '../Spam';
import Guessed from '../Guessed';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();
	
	const [mail, setMail] = useState('');
	const [login, setLogin] = useState(false);
	const [spam, setSpam] = useState(false);
	const [ham, setHam] = useState(false);
	const [guessDisplay, setGuessDisplay] = useState(false);
	const [result, setResult] = useState(false);

	useEffect(
		function () {
			if (mail === 'adminlogin') {
				setLogin((val) => !val);
				
			}
			if (mail !== 'adminlogin') {
				setLogin(false);
			}
		},
		[mail]
	);

	useEffect(
		function () {
			const controller = new AbortController();
			const handleClick = async () => {
				const data = { message: mail };
				const res = await fetch('http://127.0.0.1:3000/predict', {
					signal: controller.signal,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});
				const result = await res.json();
				if (result !== null) {
					setGuessDisplay(true);
					setResult(true);
					dataHandler(result);
				}
			};
			const check = document.getElementById('check');
			// Attach the event listener when the component mounts
			check?.addEventListener('click', handleClick);
			// Detach the event listener when the component unmounts
			if (mail.length > 0) check?.removeAttribute('disabled');
			return () => {
				check?.removeEventListener('click', handleClick);
				controller.abort();
			};
		},
		[mail]
	);

	function loginHandler(){
		navigate('/login');
	}
	function guessHandler() {
		setGuessDisplay((guess) => !guess);
	}
	function dataHandler(data: { Response: string }) {
		if (data.Response === 'Ham') {
			setSpam(false);
			setHam(true);
		}
		if (data.Response === 'Spam') {
			setHam(false);
			setSpam(true);
		}
	}
	function resetHandler() {
		const check = document.getElementById('check');
		check?.setAttribute('disabled', 'true');
		setHam(false);
		setMail('');
		setSpam(false);
		setResult(false);
		setGuessDisplay(false);
	}

	return (
		<>
			<Heading text={'Mail Defender 📧'} />
			<Textarea
				value={mail}
				onChange={(e) => setMail(e.target.value)}
				placeholder='Enter your email here !'
			/>
			<Spam spam={spam} ham={ham} />
			<div>
				<Button
					disabled
					id='check'
					variant='outline'
					onClick={() => setGuessDisplay(true)}
				>
					Check
				</Button>
				{result ? (
					<Button
						variant='link'
						className={'mt-6'}
						onClick={() => resetHandler()}
					>
						Reset
					</Button>
				) : null}
			</div>

			{login ? <Button className={'mt-2'} onClick={()=>loginHandler()}>Login</Button> : null}
			{result && guessDisplay ? <Guessed guessHandler={guessHandler} /> : null}
			<p className={'mt-8 font-semibold pb-5'}>Made by Ayush Rajput with 💓</p>
		</>
	);
}

export default Home;

interface SpamProps {
  spam:boolean,
  ham:boolean
}
export default function Spam( {spam, ham }:SpamProps) {
	return (
		<>
			{ham ? (
				<h3 className={'mb-3 font-bold text-xl text-lime-600'}>
					Email is not spam 😊
				</h3>
			) : null}
			{spam ? (
				<h3 className={'mb-3 font-bold text-xl text-red-600'}>
					Email is spam 💀
				</h3>
			) : null}
		</>
	);
}

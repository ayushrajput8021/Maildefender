interface HeadingProps {
	text: string;
}
export function Heading({ text }: HeadingProps) {
	return <h1 className={'text-6xl mt-6 font-serif mb-6'}>{text}</h1>;
}

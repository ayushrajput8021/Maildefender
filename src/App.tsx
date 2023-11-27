import { ThemeProvider } from '@/components/theme-provider';
import Home from './components/Pages/Home';
// import Admin from './components/Pages/Admin';



function App() {
	
	return (
		<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
			{
				<Home/>
				// <Admin/>
			}
		</ThemeProvider>
	);
}

export default App;

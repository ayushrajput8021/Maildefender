import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Admin from './components/Pages/Admin';

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
				{
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/admin' element={<Admin />} />
					</Routes>
				}
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;

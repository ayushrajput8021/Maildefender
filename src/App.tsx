import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Admin from './components/Pages/Admin';
import AccTable from './components/AccTable';
import NewMail from './components/NewMail';
import Train from './components/Pages/Train';
import { useState } from 'react';

function App() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	return (
		<BrowserRouter>
			<ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
				{
					<Routes>
						<Route path='/' element={<Home />} />
						<Route
							path='/login'
							element={<Login username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>}
						/>
						<Route path='/admin' element={<Admin />} />
						<Route path='/acc-data' element={<AccTable username={username} password={password}/>} />
						<Route path='/mail-data' element={<NewMail username={username} password={password}/>} />
						<Route path='/train' element={<Train username={username} password={password} />} />
					</Routes>
				}
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;

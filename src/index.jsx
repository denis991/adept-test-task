import React from 'react'
import ReactDOM from 'react-dom/client'

import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/index'
import Pages from './pages'
const root = ReactDOM.createRoot(document.getElementById('root') )
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
        <Pages/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
)

reportWebVitals()

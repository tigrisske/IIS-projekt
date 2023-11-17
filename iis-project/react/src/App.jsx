import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './components/Context'

function App() {
    return (
        <BrowserRouter>
            <ContextProvider />
        </BrowserRouter>
    )
}

export default App

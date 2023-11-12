import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './components/Context'

function App() {
    return (
        <div>
            <BrowserRouter>
                <ContextProvider />
            </BrowserRouter>
        </div>
    )
}

export default App

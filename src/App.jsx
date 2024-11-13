import { useState } from 'react'
import PraticeForm from './components/PraticeForm'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <PraticeForm/>
        </>
    )
}

export default App

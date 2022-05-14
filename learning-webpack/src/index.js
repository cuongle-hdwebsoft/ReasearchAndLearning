import React from 'react' 
import ReactDOM from 'react-dom'
import Button from './components/Button/Button.jsx'

function App() {
    return (
        <div>
            <h1>Hello webpack</h1>
            <>
                <h1>React Fragment</h1>
                <Button variant='primary'></Button>
                <Button variant='danger'></Button>
                <Button variant='info'></Button>
            </>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const todoData = [
  {id: "-1", name: "Placeholder", description: "This is a placeholder", isCompleted: false, isSelected: false},
  {id: "-2", name: "Placeholder", description: "This is a placeholder", isCompleted: true, isSelected: false}
];


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={todoData}/>
  </StrictMode>,
)
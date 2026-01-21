import logo from './assets/images/logo.svg'

function App() {

  return (
    <div className="min-h-screen flex items-start justify-between p-8 bg-pink-100">
      <h1 className="text-xl font-bold underline">
        Hello Tailwind 👋
      </h1>
      <img src={logo} alt="NumaTravel Logo" className="h-16 w-16"/>
    </div>
  )
}

export default App

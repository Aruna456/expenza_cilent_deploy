import './App.css';
import Graph from './components/graph';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shawdow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">ExpenZa</h1>
      {/*grid columns */}
      <div className="grid md:grid-cols-2 gap-4">
      {/*Chart*/}
      <Graph></Graph>
      {/*form*/}
      <Form></Form>
      </div>
   </div>
      
    </div>
  );
}

export default App;

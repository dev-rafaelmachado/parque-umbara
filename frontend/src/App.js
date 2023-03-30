import './App.css';
import About from './components/Home/About';
import Footer from './components/Home/Footer';
import Header from './components/Home/Header';
import Panel from './components/Home/Panel';
import SafekidsAbout from './components/Home/SafekidsAbout';

function App() {
  return (
    <div className="App">
      <Header />
      <Panel />
      <About />
      <SafekidsAbout />
      <Footer />
    </div>
  );
}

export default App;

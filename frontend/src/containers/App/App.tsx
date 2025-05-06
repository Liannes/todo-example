import '@assets/app.scss';
import Header from '@shared/component/Header';
import Dashboard from '../Dashboard/index';
import CustomToastContainer from './component/CustomToastContainer';
import VantaBackground from './component/VantaBackground';

function App() {
  return (
    <div className="layout">
      <VantaBackground />
      <Header />
      <div className="layout-container">
        <Dashboard />
      </div>
      <CustomToastContainer />
    </div>
  );
}

export default App;

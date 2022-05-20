import AppHeader from './components/AppHeader'
import Home from './views/Home'
import './styles/main.sass';
import './App.sass';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);

function App() {
  return (
      <div id='app'>
            <AppHeader></AppHeader>
            <div className='content'>
                <Home></Home>
            </div>
      </div>
  );
}

export default App;

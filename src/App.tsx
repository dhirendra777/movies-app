import { memo } from 'react';
import Home from './pages/Home';

const App = memo(() => {
  return <Home />;
});

App.displayName = 'App';

export default App;

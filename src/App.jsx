import Routes from './Routes';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Routes />
    </LanguageProvider>
  );
}

export default App;

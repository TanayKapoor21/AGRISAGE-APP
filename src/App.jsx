import Routes from './Routes';
import { LanguageProvider } from './contexts/Languagecontext';

function App() {
  return (
    <LanguageProvider>
      <Routes />
    </LanguageProvider>
  );
}

export default App;

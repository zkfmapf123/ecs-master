import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/globalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartDetail from './pages/CartDetail/CartDetail';
import Nav from './components/Nav/Nav';
import ListPage from './pages/Home/ListPage';
import NotYet from './pages/NotYet';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<ListPage />} path="/" />
            <Route element={<CartDetail />} path="/cartdetail" />
            <Route element={<NotYet />} path="/new" />
            <Route element={<NotYet />} path="/categories" />
            <Route element={<NotYet />} path="/hijab" />
            <Route element={<NotYet />} path="/top" />
            <Route element={<NotYet />} path="/bottom" />
            <Route element={<NotYet />} path="/dress" />
            <Route element={<NotYet />} path="/set" />
            <Route element={<NotYet />} path="/knitwear" />
            <Route element={<NotYet />} path="/praying-set" />
            <Route element={<NotYet />} path="/defectsale" />
            <Route element={<NotYet />} path="/all" />
            <Route element={<NotYet />} path="/howtoorder" />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;

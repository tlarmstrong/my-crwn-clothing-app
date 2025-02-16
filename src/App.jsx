import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router";

import Spinner from './components/spinner/spinner.component';

import { checkUserSession } from './store/user/user.action';

// code splitting = only get resources when needed
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  // this will not change
  // only one dispatch generated from the useDispatch hook; reference will never change
  const dispatch = useDispatch();

  // will only run on initialization
  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Suspense fallback={ <Spinner /> }>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

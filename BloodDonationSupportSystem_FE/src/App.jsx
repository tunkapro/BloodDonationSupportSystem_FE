import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CustomRoute from './routes/CustomRoute'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const [user, setUser] = useState(null);

  return (
    <GoogleOAuthProvider clientId='581056826760-guivkvbnune28fsfipvi0blao6afqv6i.apps.googleusercontent.com'>
      <BrowserRouter>
        <CustomRoute />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App

import { useAuth0 } from "@auth0/auth0-react";
import SigIn from "./components/SigIn";
import Home from "./components/Home";

export default function App() {
  
  const {isAuthenticated} = useAuth0()

  console.log(process.env.REACT_APP_DOMAIN);
  return (
    !isAuthenticated ? <SigIn /> : <Home />
  )
}


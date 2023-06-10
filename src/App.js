import { useAuth0 } from "@auth0/auth0-react";
import SigIn from "./components/SigIn";
import Home from "./components/Home";

export default function App() {
  
  const {isAuthenticated} = useAuth0()

  return (
    !isAuthenticated ? <SigIn /> : <Home />
  )
}


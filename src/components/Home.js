import { withAuthenticationRequired } from "@auth0/auth0-react";
import ToDoList from "./ToDoList";
import Nav from "./Nav";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <>
      <Nav />
      <div className="w-full">
        <ToDoList />
      </div>
      <ToastContainer />
    </>
  );
}

export default withAuthenticationRequired(Home);

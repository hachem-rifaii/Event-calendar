import "./index.css"

import DemoApp  from "./calendare"
import { toast, ToastContainer } from "react-toastify"
function App() {
  const notify = () => toast("Wow so easy!");
  return (
    <>
    <ToastContainer/>
    <button onClick={notify}>Notify!</button>
       <div className="">helo from hachem and walid</div>
       <DemoApp />
    </>
  )
}

export default App

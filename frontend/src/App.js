import { Provider } from "react-redux";
import configureStore from './store'
import "./assets/logo.png"
import Main from "./client/pages/main"
import Result from "./client/pages/result";
import Admin from "./admin";
import Mentor from './admin/mentors'
import { Routes, Route, useLocation} from "react-router-dom";
import Groups from "./admin/groups";
import lessons from "./admin/lessons";
import Lessons from "./admin/lessons";

const store = configureStore()
function App() {
  let location = useLocation();
  return (
    <Provider store={store}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/group/:id" element={<Result key={location.pathname} queryname = "group_id"/>} />
          <Route path="/mentor/:id" element={<Result key={location.pathname} queryname = "mentor_id"/>} />
          <Route path="/room/:id" element={<Result key={location.pathname} queryname = "room_id"/>} />
          <Route path="/admin" element={<Admin/>}>
            <Route path="mentor" element={<Mentor/>}/>
            <Route path="group" element={<Groups/>}/>
            <Route path="lesson_in_week" element={<Lessons/>}/>
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;

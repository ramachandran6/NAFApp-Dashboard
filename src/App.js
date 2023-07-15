import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditPage } from "./components/EditPage/EditPage";
import ViewTicket from "./components/ViewTicket/ViewTicket";
import TicketHistoryTable from "./components/TicketHistoryTable/TicketHistoryTable";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/editPage" element={<EditPage />} />
          <Route path="/viewTicket/:id" element={<ViewTicket />} />
          <Route path="/TicketHistory/:id" element={<TicketHistoryTable />} />
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

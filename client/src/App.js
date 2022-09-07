// import those pages in App.js
// then based on the path show each components using react-router components
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TopNav from "./Components/TopNav";
import Dashboard from "./user/Dashboard";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import PrivateRoute from "./Components/PrivateRoute";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";
import StripeSuccess from './stripe/StripeSuccess'
import StripeCancel from "./stripe/Stripecancel";
import SearchResult from './hotels/SearchHotels'


function App() {
  return (
    <BrowserRouter>

     <TopNav/>
      <ToastContainer/>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
        <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess} />

        <PrivateRoute exact path="/stripe/cancl" component={StripeCancel} />
        <Route exact path='/search-result' component={SearchResult}/>

        <Route exact path='/hotel/:hotelId' component={ViewHotel}/>



      </Switch>
    </BrowserRouter>
  );
}

export default App;

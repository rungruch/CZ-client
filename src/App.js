import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom'

// import layout
import MainLayout from './layout/MainLayout'

// import pages
import Home from './page/HomePage'
import Ticket from './page/Ticket'
import Explore from './page/Explore'
import AnimalExhibits from './page/Animal-Exhibits'
import News from './page/News'
import Support from './page/Support'
//import ErrorPage from './component/ErrorPage'
import NotFound from './component/NotFound'
import LoginPopup from './component/LoginPopup'

import RequireAuth from './component/RequireAuth'
import AccountLayout from './layout/AccountLayout'
import MyTicket, { TicketLoader } from './page/MyTicket'
import PersonalInfo from './page/PersonalInfo'
import ChangePassword from './page/ChangePassword'
import PurchaseHistory from './page/PurchaseHistory'
import BuyLayout from './page/Buy'





const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
			<Route index element={<Home />} />
			<Route path="ticket" element={<Ticket />} />
			<Route path="explore" element={<Explore />} />
			<Route path="animal-exhibits" element={<AnimalExhibits />} />
			<Route path="news" element={<News />} />
			<Route path="support" element={<Support />} />
     		<Route path='login' element={<LoginPopup />} />
			 <Route element={<RequireAuth />}>
				<Route path="account" element={<AccountLayout />} >
					
						<Route path="personalinfo" element={<PersonalInfo />} />
						<Route path="changepassword" element={<ChangePassword />} />
						<Route path="purchasehistory" element={<PurchaseHistory />} />
						<Route path="myticket/:id" loader={TicketLoader}  element={<MyTicket />} />
						
				</Route>
				<Route path="buy" element={<BuyLayout/>} />
			</Route>
		</Route>
	)
)
const App = () => <RouterProvider router={router} />
export default App

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
import Explore,{zonesectionloader} from './page/Explore'
import AnimalExhibits,{zoneanimalLoader} from './page/Animal-Exhibits'
import News from './page/News'
import Support from './page/Support'
//import ErrorPage from './component/ErrorPage'
import NotFound from './component/NotFound'
import LoginPopup from './component/LoginPopup'

import RequireAuth from './component/RequireAuth'
import AccountLayout from './layout/AccountLayout'
import MyTicket from './page/MyTicket'
import PersonalInfo from './page/PersonalInfo'
import ChangePassword from './page/ChangePassword'
import PurchaseHistory from './page/PurchaseHistory'
import BuyLayout from './page/Buy'
import ManageTicket,{ticketmanageLoader} from './page/ManageTicket'





const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />} errorElement={<NotFound />}>
			<Route index element={<Home />} />
			
			<Route path="ticket" element={<Ticket />} />
			<Route path="explore" loader={zonesectionloader} element={<Explore />} />
			<Route path="animal-exhibits" loader={zoneanimalLoader} element={<AnimalExhibits />} />
			<Route path="news" element={<News />} />
			<Route path="support" element={<Support />} />
     		<Route path='login' element={<LoginPopup />} />
			 <Route element={<RequireAuth allowedRoles={["User","Admin"]}/>}>
				<Route path="account" element={<AccountLayout />} >
					
						<Route path="personalinfo" element={<PersonalInfo />} />
						<Route path="changepassword" element={<ChangePassword />} />
						<Route path="purchasehistory" element={<PurchaseHistory />} />
						<Route path="myticket"   element={<MyTicket />} />
						
				</Route>
				<Route path="buy" element={<BuyLayout/>} />
			</Route>
			<Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
				<Route path='addticket' element={<ManageTicket/>} loader={ticketmanageLoader}/>
			</Route>
			
		</Route>
	)
)
const App = () => <RouterProvider router={router} />
export default App

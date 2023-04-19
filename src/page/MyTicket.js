import {
	useLoaderData,
} from 'react-router-dom'

const TicketPage = () => {

	const products = useLoaderData()
	const list = products.map((e) => (
		<div className='list-content' key={e.Transactionid} to={e.Transactionid}>
			<div title={e.category}>{e.Ticketid}</div><br/>
            <div title={e.category}>{e.VisitDate}</div><br/>
            <div title={e.category}>{e.Transactionid}</div><br/>
            <div title={e.category}>{e.quantity}</div><br/>
		</div>
	))

	return (
		<>

			{products.length ? (
				<div className="list-item">{list}</div>
			) : (
				'No Ticket available'
			)}
		</>
	)
}

export default TicketPage

export const TicketLoader = async ({ params }) => {
	// const res = await getProducts();
    const { id } = params
    try {
        const res = await fetch('/api/transactions/'+ id)
        if (!res.ok) {
            throw Error('Could not fetch the products')
        }
        return res.json();
    }
    catch (error) {
        console.log(error);
        return [];
    }
	// const res = await fetch('/api/transactions/'+ id)
	// if (!res.ok) {
    //     return res.json(null);
	// 	throw Error('Could not fetch the products')
	// }
	// return res.json()
}




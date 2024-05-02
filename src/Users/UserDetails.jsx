import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Customers.css"
import { getUserbyEntryUserId } from "../services/userService.jsx"

// whenever we're at the CustomerDetails path (Route path=":customerId" element={<CustomerDetails />), we'll render this component
//here in the CustomerDetails component, we can get access to the using the useParams hook
//useParams is going to return an object with a key value pair that we defined on the route (customerId: 3, etc.)
export const UserDetails = () => {
    const [customer, setUser] = useState({})
    const { userId } = useParams() // here we're destructuring the object by pulling out the customerId; this will return to us { customerId: 3} for ex.

    useEffect(() => {
        //using "data" instaed of customerObj below bc our expand query yeilds an array of objects
        // then it returns the info from the fetch call & we call that data (data in then((data) is taco)
        getUserbyEntryUserId(userId).then((data) => {
            console.log(data)
            const userObj = data[0] // the data @ index 0 -- we're only ever expecting to have one item in the array, so we'll start @ #1 or index 0
            setUser(userObj)
        })
    }, [userId])
    
    // on initial render, there will be no user on the customer object on initial render so we use optional chaining ?
    return (
        <section className="customer">
            <header className="customer-header">{customer.user?.fullName}</header>
            <div>
                <span className="customer-info">Email : </span>
                {customer.user?.email}
            </div>
            <div>
                <span className="customer-info">Address : </span>
                {customer.address}
            </div>
            <div>
                <span className="customer-info">Phone Number : </span>
                {customer.phoneNumber}
            </div>
        </section>
    )
}

import { VscTwitter } from 'react-icons/vsc'
// import UserSidebar from '../user/UserSidebar'
import Navbar from '../Navbar'

export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div className="main-contact">
        <p className="contact">Contact Us ...</p>
        Email:
        <p> Shrouqadmin@example.com</p>
        Phone:
        <p>+966500000000</p>
        Social Media:
        <p>
          <VscTwitter />
          admin
        </p>
      </div>
    </>
  )
}

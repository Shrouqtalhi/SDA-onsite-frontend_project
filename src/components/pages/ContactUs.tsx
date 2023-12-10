import { VscTwitter } from 'react-icons/vsc'

export default function ContactUs() {
  return (
    <>
      <div className="main-contact">
        <div>
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
        <img src="library.jpeg" />
      </div>
    </>
  )
}

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div testid="footer" className="footer-con">
    <div className="footer-icon-con">
      <FaGoogle />
      <FaTwitter />
      <FaInstagram />
      <FaYoutube />
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer

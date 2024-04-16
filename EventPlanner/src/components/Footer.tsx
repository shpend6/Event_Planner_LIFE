import "./Footer.css";
import fb from '../assets/fb.png';
import ig from '../assets/ig.png';
import twit from '../assets/twitter.png';
import whatsApp from '../assets/whatsApp.png';

function EventFooter(){
    return(
        <div className="footer">
            <div className="sb_footer sevtion_padding">
                <div className="sb_footer-links">
                    <div className="sb_footer-links_div">
                        <h4>
                            For Business
                        </h4>
                        <a href="/employer">
                            <p>Employer</p>
                        </a>
                        <a href="/organisation">
                            <p>Organisation</p>
                        </a>
                        <a href="/Individual">
                            <p>Individual</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Resources</h4>
                        <a href="/employer">
                            <p>Employer</p>
                        </a>
                        <a href="/organisation">
                            <p>Organisation</p>
                        </a>
                        <a href="/Individual">
                            <p>Individual</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Resources</h4>
                        <a href="/employer">
                            <p>Employer</p>
                        </a>
                        <a href="/organisation">
                            <p>Organisation</p>
                        </a>
                        <a href="/Individual">
                            <p>Individual</p>
                        </a>
                    </div>
                    <div className="sb_footer-links_div">
                        <h4>Coming soon on</h4>
                        <div className="socialmedia">
                        <p><img src={fb} alt="facebook icon" /></p>
                        <p><img src={ig} alt="instagram icon" /> </p>
                        <p><img src={twit} alt="twitter icon" /></p>
                        <p><img src={whatsApp} alt="whatsApp icon"/></p>
                        </div>
                    </div>                   
                </div>
                <hr />
                <div className="sb_footer-below">
                    <div className="sb_footer_copyright">
                        <p>
                            @{new Date().getFullYear()} Codeinn. All rights reserved. 
                        </p>
                    </div>
                    <div className="sb_footer-below-links">
                        <a href="/terms"><div><p>Terms & Conditions</p> </div></a>
                        <a href="/privacy"><div><p>Privacy</p> </div></a>
                        <a href="/security"><div><p>Security</p> </div></a>
                        <a href="/cookies"><div><p>Cookie document</p> </div></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventFooter
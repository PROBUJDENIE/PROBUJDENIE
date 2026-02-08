import "./сompaniesThatUsePlatform.css";
import logo1 from "../../resourses/logo1.png";
import logo2 from "../../resourses/logo2.png";
import logo3 from "../../resourses/logo3.png";
import logo4 from "../../resourses/logo4.png";
import logo5 from "../../resourses/logo5.png";
import logo6 from "../../resourses/logo6.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export default function CompaniesThatUsePlatform() {
    return (<div className="companies">
            <h1 className="companies-title">Компании, которые используют Git:</h1>

            <div className="logos-wrapper">
                <div className="logos-track">
                    {logos.map((logo, index) => (<img
                            key={index}
                            src={logo}
                            alt={`Company logo ${index + 1}`}
                            className="company-logo"
                            loading="lazy"
                        />))}
                    {logos.map((logo, index) => (<img
                            key={`dup-${index}`}
                            src={logo}
                            alt={`Company logo ${index + 1}`}
                            className="company-logo"
                            loading="lazy"
                        />))}
                </div>
            </div>
        </div>);
}
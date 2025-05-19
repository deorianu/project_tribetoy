import { useEffect, useState } from "react";
import Communication from "../../assets/images/communication.jpeg";
import comm from "../../assets/images/comm.jpeg";
import seminar3 from "../../assets/images/seminar3.jpeg";
import seminar4 from "../../assets/images/seminar4.mp4";
import seminar5 from "../../assets/images/seminar5.jpeg";
import Daily1 from "../../assets/images/daily1.jpeg";
import Daily2 from "../../assets/images/daily2.jpeg";
import Daily3 from "../../assets/images/daily3.jpeg";
import Daily4 from "../../assets/images/daily4.jpeg";
import Daily5 from "../../assets/images/daily5.jpeg";
import Beauty1 from "../../assets/images/beauti1.jpeg";
import Beauty2 from "../../assets/images/beauti2.jpeg";
import Daily6 from "../../assets/images/daily6.mp4";


const OurEffort = () => {
  const [visibleSection, setVisibleSection] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    setVisibleSection(hash || "efforts1");
  }, []);

  return (
    <>
    <div className="effort container">
        <h1 className="mt-4">Our Efforts</h1>
        <h4>Empowering communities through sustainable innovation and skill development.</h4>
      
      
      
      {visibleSection === "efforts1" && (
        <>
        <section className="row effortImage-section">
        <div className="col-sm-3 card">
        <img src={comm} alt="communication"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={Communication} alt="communication"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={seminar3} alt="seminar3"></img>
        </div>
        </section>
        <section className="row effortImage-section">
        <div className="col-sm-4 card">
        <video autoPlay loop muted playsInline className="w-90">
          <source src={seminar4} type="video/mp4" />
        </video>
        </div>
        <div className="col-sm-4 card">
          <img src={seminar5} alt="seminar5"></img>
        </div>
        
      </section>
        
        <section className="effort effort-card mt-5" id="efforts1">
          <div className="effort-text">

          <h2>Seminar on 3D Printing Technology for Sustainable Toy Production</h2>
          <p><strong>Date:</strong> 3rd January 2025</p>
          <p><strong>Venue:</strong> IIT Guwahati</p>
          <p>
            A seminar introducing ST community women to 3D printing for biodegradable toy production. Key highlights:
          </p>
          
          <li>Hands-on training in 3D modeling & printing</li>
          <li>Safety and operational aspects of 3D printers</li>
          <li>E-commerce strategies for reaching global markets</li>
            
          <p>
            With the inauguration of two new 3D printing labs, this initiative ensures continuous skill enhancement, 
            paving the way for sustainable livelihoods.
          </p>
          </div>
        </section>
        </>
      )}
      
      
      {visibleSection === "efforts2" && (
        <>
        <section className="row effortImage-section">
        <div className="col-sm-4 card">
        <img src={Beauty2} alt="communication"></img>
        </div>
        <div className="col-sm-4 card">
          <img src={Beauty1} alt="communication"></img>
        </div>
      </section>
        <section className="effort effort-card" id="efforts2">
          <div className="effort-text">
          <h2>Training Session on Beautification & Detailing of Biodegradable Toys</h2>
          <p><strong>Date:</strong> 24th January 2025</p>
          <p><strong>Venue:</strong> IIT Guwahati</p>
          <p>
            This one-day training session aimed to equip women from the ST community with skills in post-production 
            beautification of biodegradable toys. Participants learned:
          </p>
          <ul>
            <li>Techniques for sanding, painting, and detailing eco-friendly toys</li>
            <li>Methods to enhance marketability while preserving sustainability</li>
            <li>Hands-on experience with expert guidance</li>
          </ul>
          <p>
            The session fostered interactive learning and concluded with a commitment to further training and skill development.
          </p>
          </div>
        </section>
        </>
      )}
      
      {visibleSection === "efforts3" && (
        <>
        <section className="row effortImage-section">
        
        <div className="col-sm-4 card">
          <img src={Daily2} alt="communication"></img>
        </div>
        <div className="col-sm-4 card">
          <img src={Daily4} alt="communication"></img>
        </div>
        <div className="col-sm-4 card">
        <img src={Daily3} alt="communication"></img>
        </div>
        
        <div className="col-sm-4 card">
          <img src={Daily5} alt="communication"></img>
        </div>
        <div className="col-sm-4 card">
        <video autoPlay loop muted playsInline className="w-90">
          <source src={Daily6} type="video/mp4" />
        </video>
        </div>
      </section>
        <section className="effort" id="efforts3">
          <div className="effort-text">

          <h2>Empowering Women Through Daily Craftsmanship</h2>
          <p>
            After undergoing extensive training, the women from the ST community have embraced their newfound skills with passion and dedication. Every day, they come together to print and hand-paint eco-friendly toys, transforming simple designs into stunning, vibrant products. 
          </p>
          <p>
            Initially unfamiliar with the art of hand-painting, these remarkable women have now become experts, mastering intricate detailing and beautification techniques. Their journey from learners to skilled artisans is a testament to their resilience and determination. 
          </p>
          <p>
            To date, we have successfully trained 75 women, empowering them to create market-ready, sustainable products. Their craftsmanship not only enhances the beauty of these biodegradable toys but also contributes to a greener, more sustainable future.
          </p>
          </div>
        </section>
        </>
      )}
      </div>
    </>
  );
};

export default OurEffort;

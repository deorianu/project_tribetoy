import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import alcheringa from "../../assets/images/alche1.jpeg";
import alcheringa1 from "../../assets/images/alche2.jpeg";
import alcheringa2 from "../../assets/images/alche3.jpeg";
import alcheringa3 from "../../assets/images/alche4.jpeg";
import alcheringa4 from "../../assets/images/alche5.jpeg";
import north from "../../assets/images/north.jpeg";
import north1 from "../../assets/images/north1.jpeg";
import north2 from "../../assets/images/north2.jpeg";
import north3 from "../../assets/images/north3.jpeg";
import north4 from "../../assets/images/north4.jpeg";
import advantage_assam1 from "../../assets/images/advantage_assam1.jpeg";
import advantage_assam2 from "../../assets/images/advantage_assam2.jpeg";
import advantage_assam3 from "../../assets/images/advantage_assam3.jpeg";
import advantage_assam4 from "../../assets/images/advantage_assam4.jpeg";
import advantage_assam5 from "../../assets/images/advantage_assam5.jpeg";
import advantage_assam6 from "../../assets/images/advantage_assam6.jpeg";
import advantage_assam7 from "../../assets/images/advantage_assam7.jpeg";
import indo1 from "../../assets/images/indo1.jpeg";
import indo2 from "../../assets/images/indo2.jpeg";

const EventsPage = () => {

  const [visibleSection, setVisibleSection] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    setVisibleSection(hash || "efforts1");
  }, []);

  return (
    <>
    <div className="effort container">
        <h1 className="mt-4">Our Events & Marketings</h1>
        <h4>Highlighting our key events and initiatives.</h4>
      
      
      
      {visibleSection === "event1" && (
        <>
        <section className="row effortImage-section">
        <div className="col-sm-3 card">
        <img src={alcheringa} alt="alcheringa"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={alcheringa1} alt="alcheringa1"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={alcheringa2} alt="alcheringa2"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={alcheringa3} alt="alcheringa3"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={alcheringa4} alt="alcheringa4"></img>
        </div>
      </section>
        
        <section className="effort effort-card mt-5" id="event1">
          <div className="effort-text">

          <h2>Two-Day Event on Hand Painting & Beautification of Biodegradable Toys</h2>
          <p><strong>Date:</strong> 1st & 2nd February 2025</p>
           <p><strong>Venue:</strong> Alcheringa, IIT Guwahati</p>
          <p>
            Held at IIT Guwahati's annual cultural fest Alcheringa, this event engaged visitors in painting biodegradable toys created by ST community women. The initiative promoted sustainable craftsmanship while allowing participants to express creativity.
          </p>
          <ul>
            <li>Hands-on Toy Painting: Attendees decorated 3D-printed biodegradable toys.</li>
           <li>Interaction with Artisans: ST community women shared insights on toy-making.</li>
           <li>Audience Engagement: Included students, artists, and families reliving childhood memories.</li>
         </ul>
         <h3>Feedback from Participants:</h3>
         <ul>
          <li>Visitors loved the concept, blending creativity with sustainability.</li>
           <li>Children enjoyed the interactive painting sessions, and professional artists suggested intricate designs.</li>
          <li>Participants showed interest in purchasing the toys, emphasizing the need for an online sales platform.</li>          </ul>
      </div>
        </section>
        </>
      )}
      
      
      {visibleSection === "event2" && (
        <>
        <section className="row effortImage-section">
        <div className="col-sm-3 card">
        <img src={north} alt="north"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={north1} alt="north1"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={north2} alt="north2"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={north3} alt="north3"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={north4} alt="north4"></img>
        </div>
      </section>
        <section className="effort effort-card" id="event2">
          <div className="effort-text">
          <h2>Green Putola Kendra Showcase at North Gauhati College</h2>
           <p><strong>Date:</strong> 16th February 2025</p>
          <p><strong>Venue:</strong> North Gauhati College, Assam</p>
           <p>
             During the prestigious Alumni Meet, Green Putola Kendra exhibited biodegradable toys made by ST community women. The event showcased the intersection of traditional craftsmanship and modern 3D printing technology.
           </p>
           <ul>
             <li>Speech by Project Coordinator: M/s. Faraah Yasmin Bora discussed women’s empowerment and sustainability.</li>
             <li>Felicitation & Mementos: Hand-painted 3D-printed mementos were gifted to guests.</li>
             <li>Toy Showcase: A display of handcrafted toys highlighting cultural heritage and eco-friendliness.</li>
           </ul>
           <h3>Feedback from Participants:</h3>
           <ul>
             <li>Attendees appreciated the craftsmanship and sustainability efforts.</li>
             <li>Alumni and professors praised the initiative and discussed potential collaborations.</li>
             <li>Many showed interest in purchasing the toys and supporting future projects.</li>           </ul>
          </div>
        </section>
        
        </>
      )}

{visibleSection === "event3" && (
        <>
        <section className="row effortImage-section">
        <div className="col-sm-3 card">
          <img src={advantage_assam1} alt="advantage_assam1"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={advantage_assam2} alt="advantage_assam2"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={advantage_assam3} alt="advantage_assam3"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={advantage_assam4} alt="advantage_assam4"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={advantage_assam5} alt="advantage_assam5"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={advantage_assam6} alt="advantage_assam6"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={advantage_assam7} alt="advantage_assam7"></img>
        </div>
      </section>
      <section className="effort effort-card" id="event3">
  <div className="effort-text">
    <h2>Showcasing our products at "Advantage Assam 2.0 - Investment and Infrastructure Summit 2025"</h2>
    <p><strong>Date:</strong> 25th-26th February 2025</p>
    <p><strong>Venue:</strong> Veterinary Field, Khanapara, Guwahati.</p>
    <p>
      Green Putola Kendra participated in Advantage Assam 2.0 – Investment & Infrastructure Summit, showcasing biodegradable toys crafted by ST women using 3D printing and hand-painting techniques.
    </p>
    <h3>Event Highlights:</h3>
    <ul>
      <li>Exhibition of Biodegradable Toys: Promoting sustainability and cultural heritage.</li>
      <li>Notable Visitors:</li>
      <ul>
        <li><strong>Prof. Rohit Sinha (IIT Guwahati):</strong> Praised craftsmanship and innovation.</li>
        <li><strong>International Delegates (Bhutan, Japan, Nepal):</strong> Expressed interest in collaboration.</li>
        <li><strong>Government & Corporate Officials:</strong> Explored bulk orders and partnerships.</li>
        <li><strong>Local Entrepreneurs & Artisans:</strong> Enthusiastic about distribution opportunities.</li>
      </ul>
      <li>Potential Collaborations:</li>
      <ul>
        <li>Tea boutique interest in customized corporate gifts.</li>
        <li>Proposed MOU for Ahom Dynasty-inspired toy designs.</li>
      </ul>
    </ul>
    <h3>Government Recognition & Publicity:</h3>
    <ul>
      <li><strong>Chief Minister Dr. Himanta Biswa Sharma:</strong> Acknowledged the initiative and pledged support.</li>
      <li><strong>Media Coverage:</strong> Featured across multiple news platforms.</li>
    </ul>
    <h3>Investment & Future Prospects:</h3>
    <ul>
      <li>Strong investor interest in scaling the biodegradable toy industry.</li>
      <li>Collaboration opportunities with self-help groups and local artisans.</li>
    </ul>
    <h3>Conclusion:</h3>
    <p>
      Green Putola’s participation opened avenues for partnerships, investment, and greater awareness, marking a milestone in sustainable livelihood empowerment for Assam’s ST community.
    </p>
  </div>
</section>
   </>
      )}
{visibleSection === "event4" && (
        <>
        <section className="row effortImage-section">
        <div className="col-sm-3 card">
          <img src={indo1} alt="indo1"></img>
        </div>
        <div className="col-sm-3 card">
          <img src={indo2} alt="indo2"></img>
        </div>
      </section>
      <section className="effort effort-card" id="event3">
  <div className="effort-text">
    <h2>Consignment of 51 pieces distributed at INDO-JAPAN symposium 2025 at IITG</h2>
    <p><strong>Date:</strong> 3th March 2025</p>
    <p><strong>Venue:</strong> IIT Guwahati, Assam.</p>
    
  </div>
</section>
   </>
      )}
      
      </div>
    </>
  );
};
export default EventsPage;


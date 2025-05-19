import { useEffect } from "react";
import Seminar from "../../assets/images/seminar.jpg";



const About = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <>
      <div className="about-container">
      <div className="about-content">
        {/* Heading */}
        <h2 className="about-heading">About Us – Green Putola Kendra</h2>

        {/* Image Section */}
        <div className="about-image-container">
          <img src={Seminar} alt="Seminar on Sustainable Toys" className="about-image" />
        </div>

        {/* Mission Section */}
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            At <strong>Green Putola</strong>, we are redefining playtime with <strong>3D-printed, biodegradable toys</strong> that are
            safe for children and gentle on the planet. More than just toys, we <strong>empower rural women</strong> from Northeast
            India by equipping them with <strong>Industry 4.0 technologies</strong> to lead the charge in eco-friendly innovation.
          </p>
          <blockquote className="about-quote">
            "What if your child’s toy could spark imagination and save the planet? That’s the magic of Green Putola."
          </blockquote>
        </div>

        {/* Community & Innovation Section */}
        <div className="about-section">
          <h3>Empowering Women, Strengthening Communities</h3>
          <p>
            At the heart of Green Putola lies our <strong>Green Putola Kendra</strong>, a dedicated space where <strong>rural
            women</strong> are trained in <strong>bioplastic processing</strong> and <strong>3D printing</strong>. This initiative
            fosters <strong>economic empowerment</strong> while driving a <strong>plastic-free revolution</strong>.
          </p>
        </div> 

        {/* Key Benefits Section */}
        <div className="about-section">
          <h3>How We Make a Difference</h3>
          <ul>
            <li><strong>Biodegradable & Safe</strong> – Our toys decompose naturally, ensuring environmental safety.</li>
            <li><strong>Industry 4.0 Innovation</strong> – Using advanced <strong>3D printing and bioplastic processing</strong>.</li>
            <li><strong>Women-Led Manufacturing</strong> – Empowering rural artisans with sustainable skills.</li>
            <li><strong>A Greener Future</strong> – Every toy supports a <strong>plastic-free, eco-conscious world</strong>.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <h3>Join the Movement</h3>
          <p>
            Green Putola is more than just a toy brand—it’s a <strong>promise</strong>. A promise that
            <strong>playtime can be sustainable</strong> and that <strong>empowered women empower the world</strong>.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;

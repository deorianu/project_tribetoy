import { useEffect } from "react";
import krishna from "../../assets/images/Krishna_led.jpeg"
import blogs from "../../assets/images/blogs1.jpeg";

const Blogs = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);
    return(
        <>
      <div className="blog-container">
      {/* Blog 1 */}
        
      <div className="blog" id="blog1">
        <div className="blog-image-container">        
        <img src={krishna} alt="Glowing Krishna Lamp" className="blog-image" />
        </div>
        <div className="blog-content">
        <h2>Radiance of Devotion: The Krishna-Themed Glowing Lamp</h2>
        <section className="blog-introduction">
          <h3>Introduction</h3>
          <p>
            Immerse your space in divine illumination with our Krishna-themed glowing lamp, a symbol of devotion and elegance. This stunning creation combines spirituality with modern aesthetics, making it an ideal choice for home décor or gifting.
          </p>
        </section>

        <section className="blog-details">
          <h3>Artistic and Spiritual Appeal</h3>
          <p>
            Crafted with intricate details, this lamp beautifully captures Krishna’s essence, making it an ideal addition to your home décor or prayer space. The warm glow enhances the peaceful ambiance of any room.
          </p>
          <h3>Eco-Friendly and Sustainable</h3>
          <p>
            Designed with environmentally friendly materials, the lamp ensures both durability and minimal ecological impact. It is energy-efficient, offering a responsible way to illuminate your space.
          </p>
          <h3>Perfect Gift for Every Occasion</h3>
          <p>
            Whether for festivals, housewarmings, or personal devotion, this glowing Krishna lamp is a meaningful and timeless gift. Its divine charm brings positivity and tranquility to any setting.
          </p>
        </section>
      </div>
      </div>
      <hr></hr>

      {/* Blog 2 */}
      <div className="blog" id="blog2">
        
        <div className="blog-image-container">
        <img src={blogs} alt="Bihu-Inspired Product" className="blog-image" />
        </div>
        <div className="blog-content">
        <h2>Bihu Celebration: A Tribute to Assam’s Heritage</h2>
        <section className="blog-introduction">
          <h3>Introduction</h3>
          <p>
            Bihu, the heart and soul of Assam’s cultural landscape, is a festival of joy, dance, and deep-rooted traditions. It signifies the arrival of a new harvest season, bringing families and communities together in celebration.
          </p>
        </section>

        <section className="blog-details">
          <h3>Significance of Bihu</h3>
          <p>
            Bihu marks the changing seasons and celebrates the agrarian lifestyle of Assam, bringing communities together in a joyous occasion filled with traditional music, dance, and feasting.
          </p>
          <h3>Traditional Crafts</h3>
          <p>
            Inspired by the vibrant Bihu festival, our handcrafted products reflect Assam’s cultural richness and artistic excellence. Each piece embodies the festive spirit, making it a perfect addition to your home or gift collection.
          </p>
        </section>
      </div>
      </div>
      <hr></hr>
      {/* Blog 3 */}
      <div className="blog" id="blog3">
        
        <div className="blog-image-container">
        <img src="/path-to-image3.jpg" alt="Eggshell Creations" className="blog-image" />
        </div>
        <div className="blog-content">
        <h2>Eco-Friendly Innovation: The Hand-Painted Eggshell Creations</h2>      
        <section className="blog-introduction">
          <h3>Introduction</h3>
          <p>
            Our latest collection showcases innovative, utilities-based products that resemble an eggshell in design. This unique concept blends aesthetic appeal with sustainability.
          </p>
        </section>

        <section className="blog-details">
          <h3>Unique Hand-Painted Designs</h3>
          <p>
            Each piece is meticulously hand-painted by skilled artisans, making every creation one of a kind. The delicate strokes and vibrant colors ensure that these pieces stand out in any collection.
          </p>
          <h3>Sustainable and Artistic</h3>
          <p>
            The eco-friendly approach behind these designs ensures that sustainability and artistry go hand in hand. Whether as decorative pieces or functional items, these creations are perfect for environmentally conscious buyers.
          </p>
        </section>
      </div>
      </div>
      <hr></hr>
      {/* Blog 4 */}
      <div className="blog" id="blog4">
      <div className="blog-image-container">
        <img src="/path-to-image4.jpg" alt="Krishna's Sustainable Collection" className="blog-image" />
      </div>
        <div className="blog-content">
        <h2>Krishna’s Sustainable Creations: Blending Art with Eco-Consciousness</h2>
        <section className="blog-introduction">
          <h3>Introduction</h3>
          <p>
            Krishna’s sustainable creations offer a perfect fusion of artistry and environmental responsibility. Our products are designed to reflect cultural heritage while maintaining eco-friendly principles, ensuring that every purchase contributes to a greener planet.
          </p>
        </section>
        <section className="blog-details">
        
          <h3>Handcrafted Masterpieces</h3>
          <p>
            Our skilled artisans create each piece with precision, ensuring that every product tells a unique story while being gentle on the planet. From décor items to functional products, our range caters to diverse needs.
          </p>
          <h3>Product Categories</h3>
          <ul>
            <li><strong>Wall Art & Décor:</strong> Elevate your interiors with handcrafted, sustainable wall hangings and artistic décor items.</li>
            <li><strong>Biodegradable Showpieces:</strong> Artistic creations like the Tabla showpiece blend tradition with sustainability.</li>
            <li><strong>Cultural Gifts:</strong> Thoughtful and environmentally friendly gifts that reflect rich heritage.</li>
          </ul>
        </section>
      </div>
      </div>
      <hr></hr>
      {/* Blog 5 */}
      
    </div>
    </>
  );
};

export default Blogs;
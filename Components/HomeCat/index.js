import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';


const HomeCat = (props) => {

  return (
    <section className="homeCat">
      <div className="container">
        <h3 className="mb-0 hd">Featured Categories</h3>
          <p className='text-light text-sm mb-0'>Browse through our diverse collection of categories to find what you need.</p>
        <div className="row justify-content-left mt-2">
          {props.catData?.categoryList?.length !== 0 &&
            props.catData?.categoryList.map((cat, index) => {
              return (
                <div className=" mb-4" key={index}>
                  <div className="card category-card text-center"
                  style={{ 
                    padding: "10px",
                    
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for better styling
                  }}
                  >
                    
                      <h5 className="card-title category-name ">{cat.name}</h5>
                      
                    
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};


export default HomeCat;

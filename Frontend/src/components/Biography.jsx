// import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
          A biography is the story of a persons life. The word comes from the Greek words bios (which means life) and graphein (which means write). When the biography is written by the person it is about, it is called an autobiography.A written biography is a part of literature. Biographies can also be made as movies (often called biopics) or told as stories.The oldest written biographies that historians have were written to record rulers lives. Some were written in Assyria, ancient Babylonia, ancient Egypt and ancient Mesopotamia. 
          </p>
          <p>We are Developer!</p>
          <p>We are working on Hospital Manegment System Project!.</p>
          <p>
          In ancient China, a biography was one of the basic forms of a history book. In India, biographies of Buddha and his reincarnated lives were written. In ancient Greece, people wrote biographies of people that were not rulers too. Xenophon wrote a biography of Socrates and gave this book the name Memorabilia (Memories). During the Roman Empire, Plutarch wrote Parallel Lives about ancient Greek and Roman politicians, and Suetonius wrote biographies of the Roman emperors. The Gospels were also biographies of Jesus Christ.
          </p>
          {/* <p>Lorem ipsum dolor sit amet!</p> */}
          <p>Coding is Interesting!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
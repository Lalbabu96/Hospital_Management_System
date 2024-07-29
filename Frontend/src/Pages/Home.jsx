
import Hero from "../components/Hero.js";
import Biography from "../components/Biography.js";
import MessageForm from "../components/MessageForm.js";
import Departments from "../components/Departments.js";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
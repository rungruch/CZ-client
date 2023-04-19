
import HeroSection from "../component/HeroSection";
import News from "../component/News";
import "../component/home.css";
import Footer from "../component/Footer";

  const Exhibition = () => {
    const exhibitiondata = [
        {
          id:'1',
          exhibitonheadline:'Sea Othher Habitat',
          exhibitonImageUrl:'/img/assets|main|OthereEX.jpg',
          exhibitonUrl:'/img/assets|main|OthereEX.png',
        },
        {
            id:'2',
            exhibitonheadline:'Shark Lagoon',
            exhibitonImageUrl:'/img/assets|main|SharkEX.jpg',
            exhibitonUrl:'/img/assets|main|SharkEX.png',
        },
      ];

      const ExhibitionCard = exhibitiondata.map((e) => (
        <div className="exhibition-card" key={e.id}>
            <img src={e.exhibitonImageUrl} alt="exhibitonimg" className="unselectable"/>
         <div className="exhibition-card-description">
        <p>{e.exhibitonheadline}</p>
      </div>
    </div>
    
      ));

    return(
        <>
        <div className="exhibition">

        <h2>FEATURED EXHIBITIONS</h2>
        <div className="exhibition-card-container">
        {ExhibitionCard}
        </div> 
     
        </div>      
        </>
    );
    }

const Home = () => {
    return(
        <>
        <HeroSection/>    
        <News/>
        <Exhibition/>
        <Footer />
        </>
    );
};
export default Home; 



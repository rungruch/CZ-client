import { useState , useEffect} from 'react';
import moment from 'moment';

const News = () => {

  const [newsdata, setNewsData] = useState([]);
  const [currentNews, setCurrentNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await newsLoader();
      setNewsData(data);
      setCurrentNews(data[0]);
    };
    fetchData();
  }, []);

    const handleNewsHover = (news) => {
    setCurrentNews(news);
  };

  const NewsList = newsdata.map((e) => (
    <div
      className='newslistComponent'
      key={e.id}
      onMouseEnter={() => handleNewsHover(e)}
    >
      <div className='newslistDetails'>
        <h3>{e.eventName}</h3>
        <div className='newslistDetails-Body'>
          <img src='/img/assets|main|location.png' alt='location'/>
        <p>{e.eventLocation}</p>
        </div>
        
      </div>

      <div className='newslistTime'>
        <p>{e.eventtime}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className='news'>
      <div className='currentime'>
              <p>TODAY EVENTS</p>
              <h2>{moment().format("MMM Do YYYY")}</h2>
            </div>
        <div className='news-content'>
          <div className='newslist'>
            {NewsList}
          </div>
          <div className='news-preview'>
            <img className='news-img unselectable' src={currentNews.animalUrl} alt='animalImage'/>
            <div className='news-preview-headline'>
              <p>{currentNews.eventShortHeadlline}</p>
              <img src='/img/assets|main|descriptionbg.jpg' width='600px' height='150px' alt='headlineBG' className='unselectable'/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;

export const newsLoader = async () => {
	// const res = await getProducts();
	const res = await fetch('/api/news')
	if (!res.ok) {
		throw Error('Could not fetch the products')
	}
	return res.json()
}
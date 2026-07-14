import data from "../assets/data.json";
import NewsCard from "../components/NewsCard.jsx";
import { useNavigate } from "react-router-dom";
import { Flame, TrendingUp, ChevronRight } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  // Simple layout split for visual hierarchy
  const heroPost = data[0];
  const trendingPosts = data.slice(1, 5);
  const gridPosts = data.slice(5);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
      
      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Main Hero Article */}
        {heroPost && (
          <div 
            onClick={() => navigate(`/article/${heroPost.id}`)}
            className="lg:w-2/3 group cursor-pointer relative overflow-hidden bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl h-[450px] lg:h-[550px] border-b-4 border-orange-500 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img 
              src={heroPost.imageUrl || "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200"}
              alt={heroPost.title}
              className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-out"
            />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 z-20 w-full border-l-4 border-orange-500 ml-6 mb-6 bg-black/40 backdrop-blur-md max-w-[85%] rounded-r-xl">
              <span className="inline-block bg-orange-500 text-white text-[11px] font-bold px-3 py-1 uppercase tracking-widest mb-4 shadow-md rounded-sm">
                Breaking News
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight group-hover:text-orange-200 transition-colors">
                {heroPost.title}
              </h1>
              <p className="text-slate-300 mt-4 line-clamp-2 text-sm sm:text-base leading-relaxed hidden sm:block">
                {heroPost.heading}
              </p>
            </div>
          </div>
        )}

        {/* Trending Side Articles */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="flex items-center justify-between border-b-2 border-orange-500 pb-2 mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={20} className="text-orange-500" />
              Trending
            </h2>
          </div>
          
          <div className="flex flex-col h-full divide-y divide-slate-100 dark:divide-white/10">
            {trendingPosts.map((post, index) => (
              <div 
                key={post.id}
                onClick={() => navigate(`/article/${post.id}`)}
                className="group cursor-pointer flex gap-4 py-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors rounded-lg px-2"
              >
                <div className="w-1/3 h-20 sm:h-24 overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-800 relative rounded-md">
                  <span className="absolute top-0 left-0 bg-orange-500 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center z-10 rounded-br-md">
                    {index + 1}
                  </span>
                  <img 
                    src={post.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=400"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                  />
                </div>
                <div className="w-2/3 flex flex-col justify-center">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-500 transition-colors line-clamp-3 leading-snug">
                    {post.title}
                  </h3>
                  <span className="text-[11px] text-orange-500 mt-2 flex items-center gap-1 font-bold uppercase tracking-wider">
                    <Flame size={12} />
                    {post.views || Math.floor(Math.random() * 5000)} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LATEST NEWS GRID */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-white/10 pb-2 mb-6 mt-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest">
          Latest Updates
        </h2>
        <button className="text-sm font-bold text-orange-500 uppercase tracking-wider hover:underline flex items-center">
          See All <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridPosts.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
      
    </div>
  );
}

export default Home;

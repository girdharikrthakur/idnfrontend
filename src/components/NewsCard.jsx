import { useNavigate } from "react-router-dom";
import { Eye, User, Calendar } from "lucide-react";

export default function NewsCard({
  id,
  title,
  heading,
  imageUrl,
  views,
  author,
  createdAt,
  category
}) {
  const navigate = useNavigate();
  
  return (
    <div
      onClick={() => navigate(`/article/${id}`)}
      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 border-b-4 border-b-orange-500 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-black/50">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=800"} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out"
        />
        {category && (
          <span className="absolute bottom-0 left-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md">
            {category}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
          {title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 flex-grow leading-snug">
          {heading}
        </p>

        <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <User size={12} className="text-slate-400" />
              {author || 'Editorial'}
            </span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <Calendar size={12} className="text-slate-400" />
              {createdAt ? new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Today'}
            </span>
          </div>
          <span className="flex items-center gap-1 text-orange-500">
            <Eye size={12} /> 
            {views || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

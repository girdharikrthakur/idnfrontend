import { useNavigate } from "react-router-dom";

export default function NewsCard({
  id,
  title,
  heading,
  imageUrl,
  views,
  author,
  createdAt,
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/article/${id}`)}
      className="m-4 p-4 rounded min-w-[400px] bg-white"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="text-lg font-bold mt-2">{title}</h2>
      <p className="text-sm text-gray-600">{heading}</p>

      <div className="flex justify-between items-center mt-2 text-sm">
        <span>👀 {views}</span>
        <span>{author}</span>
      </div>

      <p className="text-xs text-gray-400 mt-1">
        {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

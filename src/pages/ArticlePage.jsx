import { useParams } from "react-router-dom";
import data from "../assets/data.json";

function ArticlePage() {
  const { id } = useParams();

  // find article
  const article = data.find((item) => item.id === Number(id));

  if (!article) return <h1>Article not found</h1>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <img
        src={article.imageUrl}
        className="w-full h-80 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">{article.title}</h1>

      <p className="text-gray-600 mt-2">{article.heading}</p>

      <div className="text-sm text-gray-500 mt-2">
        {article.author} • {article.createdAt}
      </div>

      <p className="mt-6 text-lg leading-relaxed">
        {/* dummy content */}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. This is your
        full article content.
      </p>
    </div>
  );
}

export default ArticlePage;

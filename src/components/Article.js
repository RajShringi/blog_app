import moment from "moment";
import { AiFillHeart } from "react-icons/ai";

function Article({ article }) {
  return (
    <article className="my-4 bg-white p-4 shadow-sm rounded-lg">
      <header className="flex justify-between items-center mb-4">
        <div className="flex justify-between items-center">
          <img
            className="h-10 w-10 object-cover rounded-full border-2 border-indigo-400 mr-4"
            src={article.author.image}
            alt={article.author.username}
          />
          <div>
            <p className="text-sm text-indigo-400">{article.author.username}</p>
            <p className="text-xs">
              {moment(article.createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
        <div>
          <p>
            <AiFillHeart />
          </p>
        </div>
      </header>

      <div>
        <h2 className="text-2xl font-bold text-indigo-400">{article.title}</h2>
        <p className="my-4">
          {article.description && article.description.substring(0, 200)}
          ...
        </p>
        <p className="text-sm my-4">{article.tagList}</p>
        <button className="text-sm p-2 bg-indigo-400 text-white inline-block rounded-lg hover:bg-indigo-500">
          Read More
        </button>
      </div>
    </article>
  );
}
export default Article;

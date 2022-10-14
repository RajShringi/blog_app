import Article from "./Article";

function Articles({ articles, pages, offset, handleFetchPagination }) {
  return (
    <div>
      {/* Articles */}
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}

      {/* Pagination */}
      <ul className="grid grid-cols-12 gap-1">
        {pages.map((page, index) => {
          return (
            <li
              key={index}
              onClick={() => handleFetchPagination(page)}
              className={`border p-1 text-center rounded-lg cursor-pointer ${
                offset === page ? "bg-indigo-400 text-white" : "bg-white"
              }`}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Articles;

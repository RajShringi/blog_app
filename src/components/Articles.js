import Article from "./Article";

function Articles({ articles, pages, activePageIndex, handleFetchPagination }) {
  if (articles.length < 1) {
    return (
      <h2 className="text-center font-bold text-4xl">No Articles Found</h2>
    );
  }

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
                activePageIndex === page
                  ? "bg-indigo-400 text-white"
                  : "bg-white"
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

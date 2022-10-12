import Loader from "./Loader";
function Tags({ tags }) {
  return (
    <>
      <p className="font-bold border-b-2 mb-2 border-gray-400 p-1">
        Popular Tags
      </p>
      {!tags && <Loader />}
      {tags && (
        <ul className="flex items-center flex-wrap space-x-4">
          {tags.map((tag, index) => {
            return (
              <li
                key={index}
                className="bg-gray-200 p-1 m-1 rounded-lg text-sm"
              >
                {tag}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
export default Tags;

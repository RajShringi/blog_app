function Tags({ tags, handleClickTag }) {
  return (
    <>
      <p className="font-bold border-b-2 mb-2 border-gray-400 p-1">
        Popular Tags
      </p>

      <ul className="flex items-center flex-wrap space-x-4">
        {tags.map((tag, index) => {
          return (
            <li
              onClick={() => handleClickTag(tag)}
              key={index}
              className="bg-gray-200 p-1 m-1 rounded-lg text-sm cursor-pointer"
            >
              {tag}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default Tags;

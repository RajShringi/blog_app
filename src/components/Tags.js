import React from "react";
import { myfetch } from "../utils/api";
import { ROOT_URL } from "../utils/constant";
import Loader from "./Loader";

class Tags extends React.Component {
  state = {
    tags: null,
    error: null,
  };
  async componentDidMount() {
    try {
      const { tags } = await myfetch(ROOT_URL + "/tags");
      this.setState({
        tags,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }
  render() {
    const { error, tags } = this.state;
    const { handleClickTag } = this.props;
    if (error) {
      return <p className="text-center">Not able to fetch Tags</p>;
    }
    return (
      <>
        {!tags ? (
          <Loader />
        ) : (
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
        )}
      </>
    );
  }
}
export default Tags;

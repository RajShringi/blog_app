import React from "react";
import { myfetch } from "../utils/api";
import moment from "moment";
import Loader from "./Loader";

class IndividualArticle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      article: null,
    };
  }

  async componentDidMount() {
    const { article } = await myfetch(
      `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`
    );
    this.setState({
      article,
    });
  }

  render() {
    const { article } = this.state;
    const paragrphs = article && article.body.split("\n\n");

    return (
      <div>
        {!article && <Loader />}
        {article && (
          <div>
            {/* Article Header */}
            <header className="bg-zinc-800 text-white py-12 h-min-[200px]">
              <div className="container mx-auto">
                <h1 className="text-4xl mb-4">{article.title}</h1>
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 object-cover rounded-full mr-4"
                    src={article.author.image}
                    alt={article.author.username}
                  />
                  <div>
                    <p className="text-sm text-indigo-400 font-bold">
                      {article.author.username}
                    </p>
                    <p className="text-xs">
                      {moment(article.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div className="container mx-auto border-b py-4">
              <ul>
                {paragrphs.map((para, index) => (
                  <li className="my-4 text-lg" key={index}>
                    {para}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 p-2 border rounded-full inline-block">
                {article.tagList}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default IndividualArticle;

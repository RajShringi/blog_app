import moment from "moment";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { articleURL } from "../utils/constant";

class Article extends React.Component {
  state = {
    article: this.props.article,
  };

  componentDidMount = () => {
    this.setState({
      article: this.props.article,
    });
  };

  handleLike = async () => {
    try {
      const { article } = this.state;
      let res, data;
      if (!article.favorited) {
        res = await fetch(`${articleURL}/${this.props.article.slug}/favorite`, {
          method: "POST",
          headers: {
            authorization: `Token ${this.props.user.token}`,
          },
        });
      } else {
        res = await fetch(`${articleURL}/${this.props.article.slug}/favorite`, {
          method: "DELETE",
          headers: {
            authorization: `Token ${this.props.user.token}`,
          },
        });
      }
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }
      data = await res.json();

      this.setState({
        article: data.article,
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  render() {
    const { article } = this.state;

    return (
      <article className="my-4 bg-white p-4 shadow-sm rounded-lg">
        <header className="flex justify-between items-center mb-4">
          <div className="flex justify-between items-center">
            {article.author.image ? (
              <NavLink to={`/profile/${article.author.username}`}>
                <img
                  className="h-10 w-10 object-cover rounded-full border-2 border-indigo-400 mr-4"
                  src={article.author.image}
                  alt={article.author.username}
                />
              </NavLink>
            ) : (
              <BsEmojiSmile className="h-10 w-10 text-indigo-400 mr-4" />
            )}
            <div>
              <NavLink to={`/profile/${article.author.username}`}>
                <p className="text-sm text-indigo-400">
                  {article.author.username}
                </p>
              </NavLink>
              <p className="text-xs">
                {moment(article.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>
          <div>
            {!this.props.user ? (
              ""
            ) : (
              <p
                onClick={this.handleLike}
                className="flex items-center space-x-2 cursor-pointer transition-all"
              >
                <span>{article.favoritesCount}</span>
                <AiFillHeart
                  className={`${
                    article.favoritesCount > 0
                      ? "text-rose-400"
                      : "text-gray-700"
                  }`}
                />
              </p>
            )}
          </div>
        </header>

        <div>
          <NavLink to={`/article/${article.slug}`}>
            <h2 className="text-2xl font-bold text-indigo-400 break-words">
              {article.title.substring(0, 100)}
            </h2>
          </NavLink>
          <p className="my-4">
            {article.description && article.description.substring(0, 200)}
            ...
          </p>
          <p className="text-sm my-4">{article.tagList}</p>
          <NavLink to={`/article/${article.slug}`}>
            <button className="text-sm p-2 bg-indigo-400 text-white inline-block rounded-lg hover:bg-indigo-500">
              Read More
            </button>
          </NavLink>
        </div>
      </article>
    );
  }
}
export default Article;

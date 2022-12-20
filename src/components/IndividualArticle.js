import React from "react";
import { myfetch } from "../utils/api";
import moment from "moment";
import Loader from "./Loader";
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { articleURL } from "../utils/constant";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import Comments from "./Comments";
import { UserContext } from "../UserContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

class IndividualArticle extends React.Component {
  constructor(props) {
    super();
    this.state = {
      article: null,
      comments: null,
      error: null,
      body: "",
      errors: {
        body: "",
      },
    };
  }

  static contextType = UserContext;

  async componentDidMount() {
    try {
      const { article } = await myfetch(
        `${articleURL}/${this.props.match.params.slug}`
      );
      if (this.context.user) {
        const { comments } = await myfetch(
          `${articleURL}/${article.slug}/comments`,
          {
            method: "GET",
            headers: {
              authorization: `Token ${this.context.user.token}`,
            },
          }
        );
        this.setState({
          article,
          comments,
        });
        return;
      }

      this.setState({
        article,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const errors = { ...this.state.errors };
    if (!value) {
      errors[name] = "can't be empty";
    } else {
      errors[name] = "";
    }

    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      if (!this.state.body) {
        throw new Error("can't be empty");
      }
      const { comment } = await myfetch(
        `${articleURL}/${this.state.article.slug}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Token ${this.context.user.token}`,
          },
          body: JSON.stringify({
            comment: {
              body: this.state.body,
            },
          }),
        }
      );
      this.setState((prevState) => {
        return {
          body: "",
          comments: [comment, ...prevState.comments],
        };
      });
    } catch (error) {
      this.setState({
        errors: {
          body: error.message,
        },
      });
      console.log(error);
    }
  };

  handleClickDelete = async (id) => {
    try {
      const res = await fetch(
        `${articleURL}/${this.state.article.slug}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Token ${this.context.user.token}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        throw error;
      }

      const comments = this.state.comments.filter(
        (comment) => comment.id !== id
      );
      this.setState({
        comments,
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleArticleDelete = async () => {
    try {
      const res = await fetch(`${articleURL}/${this.state.article.slug}`, {
        method: "DELETE",
        headers: {
          authorization: `Token ${this.context.user.token}`,
        },
      });
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }

      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { article, comments, error, body } = this.state;

    if (error) {
      return (
        <p className="text-center my-4 text-lg font-bold">
          Couldn't fetch the article
        </p>
      );
    }

    return (
      <div>
        {!article && <Loader />}
        {article && (
          <div>
            {/* Article Header */}
            <header className="bg-zinc-800 text-white py-12 h-min-[200px]">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl mb-4">{article.title}</h1>
                <div className="flex items-center">
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
                <div className="my-6 flex items-center space-x-2">
                  <NavLink to={`/edit_post/${article.slug}`}>
                    {this.context.user &&
                      this.context.user.username ===
                        article.author.username && (
                        <button className="py-2 px-6 bg-zinc-600 hover:bg-zinc-700 flex items-center space-x-2">
                          <AiOutlineEdit className="text-2xl" />
                          <span>Edit Article</span>
                        </button>
                      )}
                  </NavLink>

                  {this.context.user &&
                    this.context.user.username === article.author.username && (
                      <button
                        onClick={this.handleArticleDelete}
                        className="py-2 px-6 bg-rose-400 hover:bg-zinc-700 flex items-center space-x-2"
                      >
                        <AiOutlineDelete className="text-2xl" />
                        <span>Delete Article</span>
                      </button>
                    )}
                </div>
              </div>
            </header>

            {/* Article Body */}
            <div className="max-w-2xl mx-auto border-b py-4">
              <ReactMarkdown
                className="prose  prose-a:text-indigo-500 lg:prose-xl"
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
              >
                {article.body}
              </ReactMarkdown>
              <div className="text-sm my-4">
                {article.tagList.map((tag, index) => (
                  <span
                    className="py-2 px-2 border mr-4 inline-block rounded-md"
                    key={index}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <footer>
              <div className="max-w-2xl mx-auto my-6">
                {this.context.user ? (
                  <Comments
                    comments={comments}
                    user={this.context.user}
                    body={body}
                    errors={this.state.errors}
                    handleChange={this.handleChange}
                    handleSubmitComment={this.handleSubmitComment}
                    handleClickDelete={this.handleClickDelete}
                  />
                ) : (
                  <p className="text-center">
                    <Link className="text-indigo-400 font-semibold" to="/login">
                      Sign in
                    </Link>{" "}
                    or{" "}
                    <Link
                      className="text-indigo-400 font-semibold"
                      to="/signup"
                    >
                      Sign up
                    </Link>{" "}
                    to add comments on this article.
                  </p>
                )}
              </div>
            </footer>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(IndividualArticle);

import React from "react";
import { myfetch } from "../utils/api";
import moment from "moment";
import Loader from "./Loader";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { articleURL } from "../utils/constant";
import Comments from "./Comments";

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

  async componentDidMount() {
    try {
      const { article } = await myfetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles/${this.props.match.params.slug}`
      );
      const { comments } = await myfetch(
        `${articleURL}/${article.slug}/comments`,
        {
          method: "GET",
          headers: {
            authorization: `Token ${this.props.user.token}`,
          },
        }
      );

      this.setState({
        article,
        comments,
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
            authorization: `Token ${this.props.user.token}`,
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
            authorization: `Token ${this.props.user.token}`,
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

  render() {
    const { article, comments, error, body } = this.state;

    const paragrphs = article && article.body.split("\n\n");

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

            <footer>
              <div className="container mx-auto my-6">
                {this.props.user ? (
                  <Comments
                    comments={comments}
                    user={this.props.user}
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

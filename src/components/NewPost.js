import React from "react";
import { articleURL } from "../utils/constant";
import { withRouter } from "react-router";
import { UserContext } from "../UserContext";

class NewPost extends React.Component {
  state = {
    title: "",
    description: "",
    body: "",
    tags: "",
    errors: {
      title: "",
      description: "",
      body: "",
      tags: "",
    },
  };

  static contextType = UserContext;

  handleChange = ({ target }) => {
    const { name, value } = target;
    const errors = this.state.errors;
    if (!value) {
      errors[name] = `${[name]} can't be empty`;
    } else {
      errors[name] = "";
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, body, tags } = this.state;

    try {
      if (!title || !description || !body || !tags) {
        throw new Error("Fields can't be empty");
      }
      const res = await fetch(articleURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${this.context.user.token}`,
        },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList: [...tags.split(",").map((tag) => tag.trim())],
          },
        }),
      });
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }

      const { article } = await res.json();
      this.props.history.push(`/article/${article.slug}`);
    } catch (errors) {
      if (errors.message === "Fields can't be empty") {
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              title: "Fill All the fields",
            },
          };
        });
      }
      console.dir(errors);
    }
  };

  render() {
    const { title, description, body, tags } = this.state;
    const {
      title: titleError,
      description: descError,
      body: bodyError,
      tags: tagsError,
    } = this.state.errors;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
      >
        <div className="my-4 text-center">
          <h1 className="text-4xl font-medium mb-2">Add New Article</h1>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">Title</label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="text"
            placeholder="Article Title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {titleError}
          </span>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">
            Description
          </label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="text"
            placeholder="What's this article about"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {descError}
          </span>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">Body</label>
          <textarea
            className="block w-full border p-2 shadow-inner rounded-lg"
            rows="10"
            placeholder="Write your article (in markdown)"
            name="body"
            value={body}
            onChange={this.handleChange}
          ></textarea>
          <span className="inline-block text-red-400 font-medium text-sm">
            {bodyError}
          </span>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">Tags</label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="text"
            placeholder="Enter tags"
            name="tags"
            value={tags}
            onChange={this.handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {tagsError}
          </span>
        </div>

        <div className="flex justify-center my-4">
          <button className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500">
            Publish Article
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(NewPost);

import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import { NavLink } from "react-router-dom";

class Comments extends React.Component {
  render() {
    const {
      body,
      comments,
      handleChange,
      handleSubmitComment,
      handleClickDelete,
    } = this.props;
    const { body: bodyError } = this.props.errors;

    return (
      <>
        <form
          onSubmit={handleSubmitComment}
          className="bg-white p-4 max-w-3xl mx-auto my-4 shadow-sm rounded-lg"
        >
          <textarea
            className="block w-full border p-2 shadow-inner rounded-lg"
            rows="4"
            placeholder="Write a comment"
            name="body"
            value={body}
            onChange={handleChange}
          ></textarea>
          <span className="inline-block text-red-400 font-medium text-sm">
            {bodyError}
          </span>
          <div className="flex justify-center my-4">
            <button className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500">
              Post Comment
            </button>
          </div>
        </form>

        <div className="max-w-3xl mx-auto my-4">
          {comments.map((comment) => {
            return (
              <div
                className="bg-white p-4 max-w-3xl mx-auto my-4 shadow-sm rounded-lg"
                key={comment.id}
              >
                <p className="text-base mb-4">{comment.body}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {comment.author.image ? (
                      <NavLink to={`/profile/${comment.author.username}`}>
                        <img
                          className="h-5 w-5 object-cover rounded-full border-2 border-indigo-400"
                          src={comment.author.image}
                          alt={comment.author.username}
                        />
                      </NavLink>
                    ) : (
                      <BsEmojiSmile className="h-10 w-10 text-indigo-400 mr-4" />
                    )}
                    <p className="text-xs">{comment.author.username}</p>
                    <p className="text-xs">
                      {moment(comment.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>

                  {this.props.user.username === comment.author.username && (
                    <button onClick={() => handleClickDelete(comment.id)}>
                      <AiFillDelete className="text-2xl" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Comments;

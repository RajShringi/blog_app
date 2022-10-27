import React from "react";
import { articleURL, profileURL } from "../utils/constant";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "./Loader";
import Articles from "./Articles";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { myfetch } from "../utils/api";

class Profile extends React.Component {
  state = {
    profile: "",
    articles: "",
    articlesCount: "",
    articlePerPage: 10,
    activePageIndex: 1,
    activeTab: "author",
    isLoading: false,
  };

  componentDidUpdate = async (prevProps, _prevState) => {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.fetchProfile();
    }
  };

  componentDidMount = async () => {
    this.fetchProfile();
  };

  fetchProfile = async () => {
    this.setState({
      isLoading: true,
    });
    const { username } = this.props.match.params;
    const { articlePerPage } = this.state;
    let res;

    try {
      if (this.props.user) {
        res = await fetch(`${profileURL}/${username}`, {
          method: "GET",
          headers: {
            authorization: `Token ${this.props.user.token}`,
          },
        });
      }
      if (!this.props.user) {
        res = await fetch(`${profileURL}/${username}`);
      }
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }
      const { profile } = await res.json();

      const articlesRes = await fetch(
        `${articleURL}?author=${username}&limit=${articlePerPage}&offset=0`
      );
      const { articles, articlesCount } = await articlesRes.json();

      this.setState({
        profile,
        articles,
        articlesCount,
        activeTab: "author",
        isLoading: false,
      });
    } catch (errors) {
      this.setState({
        isLoading: false,
      });
      console.log(errors);
    }
  };

  handleFetchPagination = async (value) => {
    this.setState({
      articles: null,
    });
    const { username } = this.props.match.params;
    const { articlePerPage } = this.state;
    const offset = (value - 1) * 1;

    this.fetchArticles(
      this.state.activeTab,
      username,
      articlePerPage,
      offset,
      value
    );
  };

  handleClickTab = async (tab) => {
    this.setState({
      articles: null,
      activeTab: tab,
    });
    const { username } = this.props.match.params;
    const { articlePerPage } = this.state;
    this.fetchArticles(tab, username, articlePerPage, 0, 1);
  };

  fetchArticles = async (tab, username, limit, offset, activePageIndex) => {
    try {
      let data;
      data = await myfetch(
        `${articleURL}?${tab}=${username}&limit=${limit}&offset=${offset}`
      );
      this.setState({
        activeTab: tab,
        articles: data.articles,
        articlesCount: data.articlesCount,
        activePageIndex,
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  handleFollowing = async () => {
    const { profile } = this.state;
    const { username } = this.props.match.params;
    this.setState({
      isLoading: true,
    });

    try {
      let res, data;
      if (!profile.following) {
        res = await fetch(`${profileURL}/${username}/follow`, {
          method: "POST",
          headers: {
            authorization: `Token ${this.props.user.token}`,
          },
        });
      } else {
        res = await fetch(profileURL + `/${username}/follow`, {
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
        profile: data.profile,
        isLoading: false,
      });
    } catch (errors) {
      this.setState({
        isLoading: false,
      });
      console.log(errors);
    }
  };

  render() {
    const {
      profile,
      articles,
      activePageIndex,
      articlesCount,
      activeTab,
      articlePerPage,
      isLoading,
    } = this.state;

    const pages = [];
    for (let i = 1; i <= Math.ceil(articlesCount / articlePerPage); i++) {
      pages.push(i);
    }

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <header className="bg-zinc-800 mb-4">
          <div className="container mx-auto py-4 text-white">
            <div className="max-w-lg text-center mx-auto p-4">
              <div className="flex justify-center items-center mb-4">
                <img
                  className="h-[100px] w-[100px] object-cover rounded-full"
                  src={profile.image}
                  alt={profile.username}
                />
              </div>
              <h1 className="text-2xl font-bold">{profile.username}</h1>
              <p className="font-light mb-4">{profile.bio}</p>
              {this.props.user &&
              this.props.user.username !== profile.username ? (
                <button
                  onClick={this.handleFollowing}
                  className="mx-auto py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 flex items-center space-x-2"
                >
                  {profile.following ? (
                    <RiUserUnfollowLine className="text-2xl" />
                  ) : (
                    <RiUserFollowLine className="text-2xl" />
                  )}
                  <span>
                    {profile.following ? "unfollow" : "follow"}{" "}
                    {profile.username}
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-center justify-end">
              <NavLink to="/settings">
                <button className="flex items-center space-x-2 bg-zinc-500 py-2 px-6 rounded-lg hover:bg-zinc-600">
                  <AiOutlineEdit className="text-2xl" />
                  <span className="text-sm">Edit Profile Settings</span>
                </button>
              </NavLink>
            </div>
          </div>
        </header>
        <div className="container mx-auto w-[60%]">
          <nav className="">
            <ul className="flex items-center space-x-4">
              <li
                onClick={() => this.handleClickTab("author")}
                className={`p-2 cursor-pointer ${
                  activeTab === "author"
                    ? "bg-indigo-400 text-white"
                    : "bg-gray-100"
                }`}
              >
                My articles
              </li>
              <li
                onClick={() => this.handleClickTab("favorited")}
                className={`p-2 cursor-pointer ${
                  activeTab === "favorited"
                    ? "bg-indigo-400 text-white"
                    : "bg-gray-100"
                }`}
              >
                Favorited Articles
              </li>
            </ul>
          </nav>

          <div className="py-4 ">
            {!articles ? (
              <Loader />
            ) : (
              <Articles
                articles={articles}
                pages={pages}
                activePageIndex={activePageIndex}
                handleFetchPagination={this.handleFetchPagination}
                user={this.props.user}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Profile);

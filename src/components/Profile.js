import React from "react";
import { articleURL, profileURL } from "../utils/constant";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Loader from "./Loader";
import Articles from "./Articles";
import { NavLink } from "react-router-dom";
import { myfetch } from "../utils/api";

class Profile extends React.Component {
  state = {
    profile: "",
    articles: "",
    articlesCount: "",
    articlePerPage: 10,
    activePageIndex: 1,
    activeTab: null,
    isLoading: false,
  };

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    const { username } = this.props.match.params;
    const { articlePerPage } = this.state;

    try {
      const res = await fetch(profileURL + `/${username}`);
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
    const activePageIndex = value;

    const offset = (activePageIndex - 1) * 1;

    try {
      let data;
      switch (this.state.activeTab) {
        case null:
          data = await myfetch(
            `${articleURL}?author=${username}&limit=${articlePerPage}&offset=${offset}`
          );
          break;
        case "fav":
          data = await myfetch(
            `${articleURL}?favorited=${username}&limit=${articlePerPage}&offset=${offset}`
          );
          break;
        default:
          break;
      }
      this.setState({
        articles: data.articles,
        articlesCount: data.articlesCount,
        activePageIndex,
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  handleClickTab = async (tab) => {
    this.setState({
      articles: null,
    });
    const { username } = this.props.match.params;
    const { articlePerPage } = this.state;

    try {
      let data;
      switch (tab) {
        case null:
          data = await myfetch(
            `${articleURL}?author=${username}&limit=${articlePerPage}&offset=0`
          );
          break;
        case "fav":
          data = await myfetch(
            `${articleURL}?favorited=${username}&limit=${articlePerPage}&offset=0`
          );
          break;
        default:
          break;
      }
      this.setState({
        activeTab: tab,
        articles: data.articles,
        articlesCount: data.articlesCount,
        activePageIndex: 1,
      });
    } catch (errors) {
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
              <button className="mx-auto py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 flex items-center space-x-2">
                {profile.following ? (
                  <RiUserUnfollowLine className="text-2xl" />
                ) : (
                  <RiUserFollowLine className="text-2xl" />
                )}
                <span>Follow {profile.username}</span>
              </button>
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
                onClick={() => this.handleClickTab(null)}
                className={`p-2 cursor-pointer ${
                  activeTab === null
                    ? "bg-indigo-400 text-white"
                    : "bg-gray-100"
                }`}
              >
                My articles
              </li>
              <li
                onClick={() => this.handleClickTab("fav")}
                className={`p-2 cursor-pointer ${
                  activeTab === "fav"
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
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Profile;

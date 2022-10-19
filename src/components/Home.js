import React from "react";
import Loader from "./Loader";
import Tags from "./Tags";
import { myfetch } from "../utils/api";
import Articles from "./Articles";
import { articleURL } from "../utils/constant";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      articles: null,
      articlesCount: null,
      userSelectedTag: null,
      activePageIndex: 1,
      error: null,
      articlesPerPage: 10,
    };
  }

  async componentDidMount() {
    try {
      const limit = this.state.articlesPerPage;
      const offset = (this.state.activePageIndex - 1) * limit;
      const { articles, articlesCount } = await myfetch(
        `${articleURL}?limit=${limit}&offset=${offset}`
      );
      this.setState({
        articles,
        articlesCount,
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
    }
  }

  handleFetchPagination = async (value) => {
    this.setState({
      articles: null,
    });
    const activePageIndex = value;
    const { userSelectedTag } = this.state;
    let articles, data;
    const limit = this.state.articlesPerPage;
    const offset = (activePageIndex - 1) * 10;

    try {
      if (userSelectedTag === null) {
        data = await myfetch(`${articleURL}?limit=${limit}&offset=${offset}`);
      } else {
        data = await myfetch(
          `${articleURL}?tag=${userSelectedTag}&limit=${limit}&offset=${offset}`
        );
      }
      articles = data.articles;
      this.setState({
        activePageIndex,
        articles,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  handleClickTag = async (tag) => {
    this.setState({
      articles: null,
    });

    const { token } = this.props;
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePageIndex - 1) * 10;
    let articles, data, articlesCount;

    switch (tag) {
      case null:
        data = await myfetch(`${articleURL}?limit=${limit}&offset=${offset}`);
        break;
      case "myfeed":
        data = await myfetch(
          `${articleURL}/feed?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        break;
      default:
        let newTag = tag.replace(/#/gi, "%23");
        data = await myfetch(
          `${articleURL}?tag=${newTag}&limit=${limit}&offset=${offset}`
        );
        break;
    }

    articles = data.articles;
    articlesCount = data.articlesCount;
    this.setState({
      articles,
      articlesCount,
      userSelectedTag: tag,
      activePageIndex: 1,
    });
  };

  render() {
    const { articles, articlesCount, activePageIndex, userSelectedTag, error } =
      this.state;
    const { token } = this.props;
    const pages = [];
    for (let i = 1; i <= Math.ceil(articlesCount / 10); i++) {
      pages.push(i);
    }

    if (error) {
      return (
        <p className="text-center my-4 text-lg font-bold">
          Couldn't fetch the articles
        </p>
      );
    }

    return (
      <>
        {/* Hero Section */}
        <section className="text-center py-20 bg-no-repeat bg-cover bg-hero-pattern text-white">
          <h1 className="font-bold text-7xl border-b-2 border-white mb-2 inline-block border-dashed">
            Conduit
          </h1>
          <p className="text-2xl font-light">
            A place to share your knowledge.
          </p>
        </section>

        <div className="flex justify-between items-start container mx-auto my-4">
          <div className="w-[60%]">
            <nav>
              <ul className="flex itmes-center space-x-4 border-b-4 border-gray-100 mb-4 p-2">
                {token && (
                  <li
                    className={`p-2 cursor-pointer ${
                      userSelectedTag === "myfeed"
                        ? "bg-indigo-400 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => this.handleClickTag("myfeed")}
                  >
                    Your Feed
                  </li>
                )}

                <li
                  className={`p-2 cursor-pointer ${
                    userSelectedTag === null
                      ? "bg-indigo-400 text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => this.handleClickTag(null)}
                >
                  Global Feed
                </li>

                {userSelectedTag && userSelectedTag !== "myfeed" && (
                  <li className="text-indigo-400 p-2"># {userSelectedTag}</li>
                )}
              </ul>
            </nav>

            {/* Articles */}
            <div>
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

          {/* Tags */}
          <div className="w-[30%] bg-gray-100 p-2 rounded-lg">
            <Tags handleClickTag={this.handleClickTag} />
          </div>
        </div>
      </>
    );
  }
}
export default Home;

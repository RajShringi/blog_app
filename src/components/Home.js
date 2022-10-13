import React from "react";
import Loader from "./Loader";
import Tags from "./Tags";
import { myfetch } from "../utils/api";
import Articles from "./Articles";

class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      articles: null,
      tags: null,
      articlesCount: null,
      userSelectedTag: null,
      offset: 1,
    };
  }

  async componentDidMount() {
    try {
      const { tags } = await myfetch(
        "https://mighty-oasis-08080.herokuapp.com/api/tags"
      );
      const { articles, articlesCount } = await myfetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&offset=${
          this.state.offset * 10 - 10
        }`
      );
      this.setState({
        tags,
        articles,
        articlesCount,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleFetchPagination = async (value) => {
    this.setState({
      articles: null,
    });
    const offset = value;
    const { userSelectedTag } = this.state;
    let articles, data;
    if (userSelectedTag === null) {
      data = await myfetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&offset=${
          offset * 10 - 10
        }`
      );
    } else {
      data = await myfetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${userSelectedTag}&limit=10&offset=${
          offset * 10 - 10
        }`
      );
    }
    articles = data.articles;
    this.setState({
      offset,
      articles,
    });
  };

  handleClickTag = async (tag) => {
    this.setState({
      articles: null,
    });
    let articles, data, articlesCount;
    if (tag === null) {
      data = await myfetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&offset=0`
      );
    } else {
      let newTag = tag.replace(/#/gi, "%23");
      data = await myfetch(
        `https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${newTag}&limit=10&offset=0`
      );
    }
    articles = data.articles;
    articlesCount = data.articlesCount;
    this.setState({
      articles,
      articlesCount,
      userSelectedTag: tag,
      offset: 1,
    });
  };

  render() {
    const { tags, articles, articlesCount, offset, userSelectedTag } =
      this.state;
    const pages = [];
    for (let i = 1; i <= Math.ceil(articlesCount / 10); i++) {
      pages.push(i);
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
                <li className="text-indigo-400 p-2">
                  {userSelectedTag && `#${userSelectedTag}`}
                </li>
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
                  offset={offset}
                  handleFetchPagination={this.handleFetchPagination}
                />
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="w-[30%] bg-gray-100 p-2 rounded-lg">
            {!tags ? (
              <Loader />
            ) : (
              <Tags tags={tags} handleClickTag={this.handleClickTag} />
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Home;

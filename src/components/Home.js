import React from "react";
import Tags from "./Tags";
class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      articles: null,
      tags: null,
    };
  }
  async componentDidMount() {
    try {
      const res = await fetch(
        "https://mighty-oasis-08080.herokuapp.com/api/tags"
      );
      const data = await res.json();
      console.log(data);
      this.setState({
        tags: data.tags,
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { tags } = this.state;
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
          <div className="w-[80%]">
            <nav>
              <ul>
                <li>Global Feed</li>
              </ul>
            </nav>
          </div>
          <div className="w-[20%] bg-gray-100 p-2 rounded-lg">
            <Tags tags={tags} />
          </div>
        </div>
      </>
    );
  }
}
export default Home;

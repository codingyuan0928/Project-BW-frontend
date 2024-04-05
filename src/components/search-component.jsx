import React from "react";
import { useHistory } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const SearchComponent = (props) => {
  const { setInput, input, search, searchUrl, setCurrentSearch } = props;
  const history = useHistory();
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    history.push("/");
    if (input !== "") {
      setCurrentSearch(input);
      search(searchUrl);
      setInput("");
    }
  };

  return (
    <div>
      <form className="d-flex">
        <div className="input-group">
          <input
            className="form-controls"
            type="search"
            placeholder="搜尋"
            aria-label="Search"
            value={input}
            onChange={inputHandler}
          />
          <span
            className="input-group-text"
            id="search-icon"
            onClick={handleSearch}
          >
            <IoSearch />
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;

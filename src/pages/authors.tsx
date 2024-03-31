import Author from "../components/authors/authorCard/authorCard";
import FilterAuthor from "../components/authors/filterAuthor/filterAuthor";
import LoggedUserHeader from "../components/header/loggedUser/loggedUserHeader";
import NewPost from "../components/posts/newPost/newPost";

const authors = () => {
  return (
    <div>
      {/* <LoggedUserHeader user={userData} /> */}
      <FilterAuthor />
      <Author />
      {/* <NewPost/> */}

    </div>
  );
};

export default authors;

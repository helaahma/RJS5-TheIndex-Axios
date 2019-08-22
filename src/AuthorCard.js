import React from "react";

function AuthorCard(props) {
  const author = props.author;
  const authorName = `${author.first_name} ${author.last_name}`;
  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="card" onClick={() => props.selectAuthor(author.id)}>
        <div className="image">
          <img
            className="card-img-top img-fluid"
            src={author.imageUrl}
            alt={authorName}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <span>{authorName}</span>
          </h5>
          <small className="card-text">{author.books.length} books</small>
        </div>
      </div>
    </div>
  );
}

export default AuthorCard;

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const CardItem = ({ imageFile, description, title, tags, _id, name }) => {
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex max-80 ">
        {/*  */}
        <MDBCardImage
          src={imageFile}
          alt={title}
          position="top"
          className="w-max h-44"
        />
        <div className="absolute top-2 left-4 text-white font-semibold text-lg">
          {name}
        </div>
        <span className="text-start ml-5 mt-2.5 text-sky-600">
          {tags.map((item) => `#${item} `)}
        </span>

        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/item/${_id}`}>...Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardItem;

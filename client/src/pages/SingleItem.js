import React, { useEffect } from "react";
// import { DisqusThread } from 'disqus-react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getItem } from "../redux/features/itemSlice";
import DisqusThread from "../components/DisqusThread";

const SingleItem = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => ({ ...state.item }));
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getItem(id));
    }
  });
  return (
    <div className="max-w-6xl m-auto justify-center">
      <MDBContainer>
        <MDBCard className="mt-2 mb-3 object-fill">
          <MDBCardImage
            position="top"
            className="w-full max-h-fit"
            src={item.imageFile}
            alt={item.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              className="float-left color-[#000]"
              onClick={() => navigate("/")}
            >
              <MDBIcon fas size="lg" icon="arrow-left" />
            </MDBBtn>
            <h3>{item.title}</h3>
            <span>
              <p className="text-start color-[#F48FB1] text-lg ml-1 font normal">
                Created By: {item.name}
              </p>
            </span>

            <div className="float-left">
              <span className="text-start ">
                {item && item.tags && item.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />

            <MDBCardText className="text-start mt-3">
              <MDBIcon
                className="float-left m-2"
                far
                icon="calendar-alt"
                size="lg"
              />

              <small className="text-muted">
                {moment(item.createdAt).fromNow()}
              </small>
            </MDBCardText>

            <MDBCardText className="lead mb-0 text-start">
              {item.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        
        <DisqusThread id={id} title={item.title} path={`/item/${id}`} />
      </MDBContainer>
    </div>
  );
};

export default SingleItem;

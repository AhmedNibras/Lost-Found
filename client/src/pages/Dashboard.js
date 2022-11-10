import React, {useDebugValue, useEffect} from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { getItemsByUser } from "../redux/features/itemSlice";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  const {user} = useSelector((state) => ({...state.auth}));
  const {userItems, loading} = useSelector((state) => ({...state.item}));
  const userId = user?.result._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if(userId){
      dispatch(getItemsByUser(userId))
    }
  }, [userId])

  const excerpt = (str) => {
    if(str.length > 40){
        str = str.substring(0, 40) + "..."
    }
    return str;
}
if(loading){
    return <Spinner />
  }
  return (
    <div className="m-auto p-32 max-w-4xl content-center">
        <h4 className="text-center">Dashboard: {user?.result?.name}</h4>
        <hr className="max-w-xl" />
        {userItems && userItems.map((item) => (
            <MDBCardGroup key={item._id}>
                <MDBCard 
                className="max-w-xl mt-2"
                >
                <MDBRow className="g-0 border border-1 rounded">
                    <MDBCol md="4">
                        <MDBCardImage 
                            className="rounded"
                            src={item.imageFile}
                            alt={item.title}
                            fluid
                        />
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCardBody>
                            <MDBCardTitle
                            className="text-start">
                            {item.title}
                            </MDBCardTitle>
                            <MDBCardText className="text-start">
                                <small className="text-muted">
                                    {excerpt(item.description)}
                                </small>
                            </MDBCardText>
                            <div className="ml-1.5 float-right -mt-16}">
                                <Link to={`/editItem/${item._id}`} 
                                className="mt-1" tag="a" color="none">
                                    <MDBIcon 
                                    className="color-[#a5ccee]"
                                    fas icon="edit" size="lg" />
                                </Link>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
                </MDBCard>
            </MDBCardGroup>
        ))}
    </div>
  )
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBValidationItem,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";

import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { createItem, updateItem } from "../redux/features/itemSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEditItem = () => {
  const [itemData, setItemData] = useState(initialState);
  const [tagErrMsg, setTagErrMsg] = useState(null)
  const {error, userItems} = useSelector((state) => ({...state.item}));
  const { user } = useSelector((state) => ({...state.auth}));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { title, description, tags } = itemData;
  const { id } = useParams();

  useEffect(() => {
    if(id){
      const singleItem = userItems.find((item) => item._id === id);
      console.log(singleItem);
      setItemData({...singleItem})
    }
  }, [id, userItems])

  useEffect(() => {
    error && toast.error(error);
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!tags.length){
      setTagErrMsg("Please provide some tags")
    }
    if(title && description && tags) {
      const updatedItemData = {...itemData, name: user?.result?.name}

      if(!id){
        dispatch(createItem({updatedItemData, navigate, toast}))
      } else 
      {
        dispatch(updateItem({id, updatedItemData, toast, navigate}))
      }
      handleClear(); 
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleAddTag = (tag) => {
    setTagErrMsg(null)
    setItemData({ ...itemData, tags: [...itemData.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setItemData({
      ...itemData,
      tags: itemData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handleClear = () => {
    setItemData({title: "", description: "", tags: [] })
  };

  return (
    <div className="my-32 mx-auto p-25 max-w-md">
      <MDBCard className="square border border-3 items-center rounded-5">
        <h5>{id ? "Update Item" : "Add Item"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <MDBValidationItem feedback="Please provide description" invalid>
              <div className="col-md-12">
                <MDBInput
                  type="text"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  className="form-control"
                  placeholder="Title"
                  required
                  label='Title'
                />
              </div>
            </MDBValidationItem>

            <MDBValidationItem feedback="Please provide description" invalid>
              <div className="col-md-12">
                <MDBTextArea
                  placeholder="Enter Description"
                  type="text"
                  name="description"
                  value={description}
                  rows={4}
                  label='Description'
                  onChange={onInputChange}
                  className="form-control"
                  required
                />
              </div>
            </MDBValidationItem>

            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tags"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(Tag) => handleDeleteTag(Tag)}
                label='Tags'
              />
              {tagErrMsg && 
                <div className="text-red-600 mt-1.5 text-left text-sm">
                  {tagErrMsg}
                </div>
              }
            </div>
            <div className="d-flex justify-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setItemData({ ...itemData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn className="w-full">{id ? "Update" : "Submit"}</MDBBtn>
              <MDBBtn
                className="w-full mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
export default AddEditItem;

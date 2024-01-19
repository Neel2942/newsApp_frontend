import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {getAllCategories} from "../../graphql/query"
import { deleteCategory } from "../../graphql/mutation";

function ViewCategories() {
    const [categoryDelete] = useMutation(deleteCategory);
    const [deleteId,setDeleteId] = useState("");
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    // Delete Modal and Operation
    const openDeleteModal = () => {
    setShowDeleteModal(true);
    };

    const handleDelete = (e) => {
    setDeleteId(e.target.value);
    openDeleteModal();
    };

    const handleDeleteConfirmation = async () => {
      const {data} = await categoryDelete({
        variables:{
          categoryId:deleteId
        }
      })

      if(data){
        console.log("Category deleted successfully");
        refetch();
      }else{
        console.log("Error deleting Category");
      }
      setShowDeleteModal(false);
    };
    // Fetching Data Query And Form Handling
    const {loading,error,data,refetch} = useQuery(getAllCategories);

    useEffect(()=>{
      refetch()
    },[navigate, refetch])

    if(loading){
        return (
            <h3>Getting Data From Database</h3>
        )
    }

    if(error){
        return(
            <h3>Error Fetching Data From Database</h3>
        )
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

  return (
    <>
      <div>
        <h3 class='mb-1'>All Categories</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <table class='table table-striped'>
              <tbody class='thead-dark'>
                <tr>
                  <th scope='col'>Category-Name</th>
                  <th scope='col'>Actions</th>
                </tr>
                {data.getAllCategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.categoryName}</td>
                    <td>
                      <Link
                        type='button'
                        class='btn btn-success'
                        to={`/backyard/updateCategory?updateId=${category._id}`}>
                        Update
                      </Link>
                      {"\n"}
                      <button
                        class='btn btn-danger'
                        id='deleteBtn'
                        name='deleteBtn'
                        value={category._id}
                        type='Submit'
                        onClick={handleDelete}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you want to delete this category?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
              No
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirmation}>
              Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ViewCategories;

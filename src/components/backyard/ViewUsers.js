import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../graphql/query';
import { deleteUserById } from '../../graphql/mutation';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

function ViewUsers() {
  const [userDelete] = useMutation(deleteUserById);
  const [deleteId, setDeleteId] = useState();
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
      const {data} = await userDelete({
        variables:{
          userId:deleteId
        }
      });

      if(data){
        console.log("Category deleted successfully");
        refetch();
      }else{
        console.log("Error deleting Category");
      }
      setShowDeleteModal(false);
    };
    // Fetching Data Query And Form Handling
  const { loading, error, data, refetch } = useQuery(getAllUsers);
  
  useEffect(() => {
    refetch();
  },[navigate,refetch]);

  if (loading) {
    return <h2>Data Loading</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
    <div>
      <h3 class='mb-1'>List of All users</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <table class='table table-striped'>
            <tbody class='thead-dark'>
              <tr>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>profile-Picture</th>
                <th scope='col'>location</th>
                <th scope='col'>Created-At</th>
                <th scope='col'>Actions</th>
              </tr>
              {data.getAllUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.profilePicture}</td>
                  <td>{user.location}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <button
                      class='btn btn-danger'
                      id='deleteBtn'
                      name='deleteBtn'
                      value={user._id}
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
  )
}

export default ViewUsers
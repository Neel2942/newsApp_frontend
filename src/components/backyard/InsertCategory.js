import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Container, Row, Col, Form} from "react-bootstrap";
import { insertCategory, updateCategory } from "../../graphql/mutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategoriesById } from "../../graphql/query";

function InsertCategory() {
    const [searchParams] = useSearchParams();
    const updateId = searchParams.get("updateId");
    const navigate = useNavigate();

    const [saveCategory] = useMutation(insertCategory);
    const [categoryUpdate] = useMutation(updateCategory);

    const {data} = useQuery(getCategoriesById,{
      variables:{
        categoryId: updateId,
      }
    });
    const categoryFound = data?.getCategoryById?.categoryName;
    const [categoryName,setCategoryName] = useState(updateId? categoryFound : "");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(updateId){
          const {data} = await categoryUpdate({
            variables:{
              categoryId: updateId,
              categoryDetails:{
                categoryName:categoryName,
              }
            }
          })
          if(data){
            console.log("Category Updated Successfully");
            navigate("/backyard/viewCategory");
          }
        }else{
        const {data} = await saveCategory({
            variables:{
                categoryDetails:{
                    categoryName:categoryName,
                }
              }
          });
          if(data){
            console.log("Category added successfully");
            navigate("/backyard/viewCategory");
          }
        }
    }

  return (
    <>
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md={6}>
            <h2 className='text-center'>{`${updateId? 'Upadate': 'Add'} Categories`}</h2>
            <Form onSubmit={handleSubmit}>
              {/* Category Name Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Category-Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category Name'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Form.Group>
              <input
                type='submit'
                className='btn btn-primary mt-2'
                value={updateId ? "Update" : "Insert"}
              />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InsertCategory;

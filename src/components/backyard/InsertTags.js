import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Container, Row, Col, Form} from "react-bootstrap";
import { insertTags, updateTags } from "../../graphql/mutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTagsById } from "../../graphql/query";
function InsertTags() {
    const [searchParams] = useSearchParams();
    const updateId = searchParams.get("updateId");
    const navigate = useNavigate();

    const [saveTags] = useMutation(insertTags);
    const [tagsUpdate] = useMutation(updateTags);
    
    const {data} = useQuery(getTagsById,{
      variables:{
        tagId: updateId,
      }
    });
    const tagFound = data?.getTagsById?.tagName;
    const [tagsName,setTagsName] = useState(updateId? tagFound : "");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(updateId){
          const {data} = await tagsUpdate({
            variables:{
              tagId: updateId,
              tagsDetails:{
                tagName: tagsName,
              }
            }
          })
          if(data){
            console.log("Tags updated successfully");
            navigate("/backyard/viewTags");
          }         
        }else{
          const {data} = await saveTags({
          variables:{
            tagsDetails:{
              tagName: tagsName,
            }
          }
        });   
        if(data){
          console.log("Tags added successfully");
          navigate("/backyard/viewTags");
        }
      }
    }

  return (
    <>
      <Container>
        <Row className='justify-content-md-center mt-5'>
          <Col md={6}>
            <h2 className='text-center'>{`${updateId? 'Upadate': 'Add'} Tags`}</h2>
            <Form onSubmit={handleSubmit}>
              {/* tags Name Input */}
              <Form.Group className='mb-3'>
                <Form.Label>Tags-Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Tags Name'
                  value={tagsName}
                  onChange={(e) => setTagsName(e.target.value)}
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

export default InsertTags
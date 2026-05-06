import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  useDeleteStudentMutation,
  useGetStudentsQuery,
} from "../redux/feature/studentSlice";
import { useNavigate } from "react-router-dom";

const Read = () => {
  const {
    data: students,
    isError,
    isLoading,
    isSuccess,
  } = useGetStudentsQuery();
  const [DeleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const navigation = useNavigate();

  const deleteUser = (id: number) => {
    try {
      DeleteStudent(id);
    //   alert("Student deleted!");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Delete failed");
    }
  };
  const updateUser = (id: number) => {
  if(id){
           navigation(`/Edit/${id}`)
  }else{
    alert("Please select a student to update");
  }
  };

  return (
    <Container className="mt-4">
      {isLoading && <span>Loading...</span>}
      {isError && <span>Something went wrong</span>}
      <Row>
        {isSuccess &&
          students.map((student) => (
            <Col md={4} className="mb-4" key={student.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{student.StudentName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {student.StudentCourse}
                  </Card.Subtitle>
                  <Card.Text >Email: {student.StudentEmail}</Card.Text>
                  <Card.Link style={{ cursor: "pointer"}}
                    onClick={() => updateUser(student.id)}>Edit</Card.Link>
                  <Card.Link
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => deleteUser(student.id)}
                  >
                    Delete
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Read;

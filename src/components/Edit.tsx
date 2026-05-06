import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import {
  useUpdateStudentMutation,
  useGetStudentbyidQuery,
} from "../redux/feature/studentSlice";
import type { Student } from "../redux/modals/Student.modal";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Step 1: Fetch existing student data by ID
  const { data, isLoading, error } = useGetStudentbyidQuery(id!);

  // Step 2: Local state for form input
  const [student, setStudent] = useState<Student>({
    StudentName: "",
    StudentEmail: "",
    StudentCourse: "",
  });

  // Step 3: When data arrives, set local state
  useEffect(() => {
    if (data) {
      setStudent(data);
    }
  }, [data]);

  // Step 4: Update mutation
  const [updateStudent, { isLoading: isUpdating, isSuccess }] =
    useUpdateStudentMutation();

  // Step 5: Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Step 6: Submit updated data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateStudent({ id: id!, ...student });
      alert("Student updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  return (
    <>
      <h1>Edit Student</h1>
      <Container className="mt-4">
        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error loading student</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="StudentName"
                  value={student.StudentName}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="StudentEmail"
                  value={student.StudentEmail}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formCourse">
              <Form.Label column sm="2">
                Course
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Enter course"
                  name="StudentCourse"
                  value={student.StudentCourse}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Student"}
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default Edit;

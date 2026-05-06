import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useAddStudentMutation } from "../redux/feature/studentSlice";
import type { Student } from "../redux/modals/Student.modal";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [student, setStudent] = useState<Student>({
    StudentName: "",
    StudentEmail: "",
    StudentCourse: "",
  });
  const navigation = useNavigate();
  const [addStudent, { isLoading, isSuccess, isError }] =
    useAddStudentMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addStudent(student);
      alert("Student created successfully!");
      setStudent({
        StudentName: "",
        StudentEmail: "",
        StudentCourse: "",
      });
      navigation("/");
    } catch (error) {
      console.error("Failed to create student:", error);
    }
  };

  return (
    <Container className="mt-4">
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

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Student"}
        </Button>
      </Form>
    </Container>
  );
};

export default Create;

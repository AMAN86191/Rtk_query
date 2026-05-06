import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Student } from "../modals/Student.modal";

export const StudentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6860c3cc8e7486408443ef1b.mockapi.io",
  }),
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "/CURD_Rtk",
      providesTags: ["Students"],
    }),
    getStudentbyid: builder.query<Student, number>({
      query: (id) => `/CURD_Rtk/${id}`,
    }),
    AddStudent: builder.mutation<void, Student>({
      query: (student) => ({
        url: "/CURD_Rtk",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    DeleteStudent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/CURD_Rtk/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
    UpdateStudent: builder.mutation<
      Student,
      { id: string } & Omit<Student, "id">
    >({
      query: ({ id, ...student }) => ({
        url: `/CURD_Rtk/${id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
  useGetStudentbyidQuery,
} = StudentApi;

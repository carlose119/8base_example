import React from 'react';
import gql from "graphql-tag";
import Form from '../../components/Form';

const TASK_MUTATION = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
    }
  }
`;

const AddTask = () => (
  <div>
    <h1>Nueva Tarea</h1>
    <Form TASK_MUTATION={TASK_MUTATION} title='' body=''/>
  </div>
);

export { AddTask };

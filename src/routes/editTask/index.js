import React from 'react';
import gql from "graphql-tag";
import { useParams } from "react-router";
import { useQuery } from "react-apollo";
import Form from '../../components/Form';

const TASK_MUTATION = gql`
  mutation TaskUpdate($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
      id
    }
  }
`;

const EditTask = () => {
  const { idTask } = useParams();
  console.log(idTask);
  const TASKQUERY = gql`
    query Task($idTask: ID!){
      task(id: $idTask) {
        id
        title
        body
        read
        createdAt
      }
    }
  `;

  const { loading, error, data } = useQuery(TASKQUERY, {
    variables: { idTask },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  console.log(data.task);
   
  return (
    <div>
      <h1>Editar Tarea</h1>
      <Form TASK_MUTATION={TASK_MUTATION} id={idTask} title={data.task.title} body={data.task.body}/>
    </div>
  );
};

export { EditTask };

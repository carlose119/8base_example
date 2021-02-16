import React from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom';

const READ_MUTATION = gql`
  mutation TaskRead($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
      id
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation TaskDelete($id: ID!) {
    taskDelete(filter: { id: $id }) {
      success
    }
  }
`;

const TaskItem = ({ task, refetch }) => {
  const readtask = async (read, task) => {
    const data = {
      variables: {
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          read: 1
        }
      }
    };
    await read(data);
    refetch();
  };

  const noReadtask = async (read, task) => {
    const data = {
      variables: {
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
          read: 0
        }
      }
    };
    await read(data);
    refetch();
  };

  const deletetask = async (remove, task) => {
    const data = {
      variables: { id: task.id }
    };
    await remove(data);
    refetch();
  };

  return (
    <article className="task">
      <section className="action">
        {
          task.read &&
          <Mutation mutation={READ_MUTATION}>
            {taskUpdate => <button onClick={e => noReadtask(taskUpdate, task)}>Marca Como No Completado</button>}
          </Mutation>
        }
        {
          !task.read &&
          <Mutation mutation={READ_MUTATION}>
            {taskUpdate => <button onClick={e => readtask(taskUpdate, task)}>Marca Como Completado</button>}
          </Mutation>
        }
      </section>
      <section className="task">
        <div className="title">
          {task.title}
        </div>
        <div className="body">
          {task.body}
        </div>
        <div className="meta">
          <span>
            {task.read > 0 ? "Leido" : "No Leido"}
          </span>
          <span>{task.createdAt} ago</span>
        </div>
      </section>
      <section className="action">
        <Link to={`/edit-task/${task.id}`}>Editar</Link>
        <Mutation mutation={DELETE_MUTATION}>
          {taskDeleteByFilter => <button onClick={e => deletetask(taskDeleteByFilter, task)}>Eliminar</button>}
        </Mutation>
      </section>
    </article>
  );
};

export default TaskItem;
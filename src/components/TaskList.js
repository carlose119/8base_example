import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import TaskItem from './TaskItem';

const TASK_QUERY = gql`
query {
  tasksList {
    items {
      id
      title
      body
      read
      createdAt
    }
  }
}
`;

const TaskList = ({ loading, tasks, refetch }) => {
    if(loading) return <p>Loading...</p>
    return tasks.map(task => <TaskItem key={task.id} task={task} refetch={refetch} />);
}

export default graphql(TASK_QUERY, {
    props(result) {
      const { data } = result;
      const { loading, refetch } = data;
      let tasks = [];
      if (data && data.tasksList) tasks = data.tasksList.items;
      return {
        loading,
        tasks,
        refetch
      };
    }
  })(TaskList);
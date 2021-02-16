import React, { useState } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";

const divStyles = {
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
};
const labelStyles = {
    color: '#828282',
    fontSize: '13px',
    fontWeight: 'bold',
    marginRight: '7px',
};
const inputStyles = {
    width: '400px',
    padding: '5px',
};

const TASK_MUTATION = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
    }
  }
`;

const Form = ({ history }) => {
    const [task, setTask] = useState({ title: '', body: '' });
    const thishistory = useHistory();
    const onFormSubmit = async createTask => {
        const data = {
          variables: {
            data: task
          }
        };
        const response = await createTask(data);
        if (response.data.taskCreate.id) {
          thishistory.push("/");
        }
    };
    return (
        <Mutation mutation={TASK_MUTATION}>
            {taskCreate => (
                <form onSubmit={e => { e.preventDefault(); onFormSubmit(taskCreate); }}>
                    <div style={{ backgroundColor: '#f6f6ef', padding: '10px 8px 15px' }}>
                        <div style={divStyles}>
                            <label htmlFor="titel" style={labelStyles}>Titulo</label>
                            <input
                                className="mb2"
                                value={task.title}
                                onChange={(e) => setTask({ ...task, title: e.target.value })}
                                type="text"
                                id="title"
                                placeholder="Titulo de la tarea"
                                style={inputStyles} />
                        </div>
                        <div style={divStyles}>
                            <label htmlFor="body" style={labelStyles}>Cuerpo</label>
                            <textarea
                                className="mb2"
                                value={task.body}
                                onChange={(e) => setTask({ ...task, body: e.target.value })}
                                placeholder="Cuerpo de la tarea"
                                rows={4}
                                id="body"
                                style={inputStyles} />
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </Mutation>
    )
}
export default Form;

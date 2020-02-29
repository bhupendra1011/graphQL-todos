import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_TODOS = gql`
  query getTodos {
    todos {
      done
      id
      text
    }
  }
`;

// add todos
// delete todos
// update todos
// fetch todos

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <div>Loading Todos....</div>;
  if (error) return <div>Error fetching Todos...</div>;
  return (
    <div>
      {data.todos.map(todo => (
        <p key={todo.id}>
          <span>{todo.text}</span>
          <button>&times;</button>
        </p>
      ))}
    </div>
  );
}

export default App;

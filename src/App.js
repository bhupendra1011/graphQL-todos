import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
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

const TOGGLE_TODO = gql`
  mutation toggleTodo($id: uuid!, $done: Boolean!) {
    update_todos(_set: { done: $done }, where: { id: { _eq: $id } }) {
      returning {
        id
        done
        text
      }
    }
  }
`;

// add todos
// delete todos
// update todos
// fetch todos

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  if (loading) return <div>Loading Todos....</div>;
  if (error) return <div>Error fetching Todos...</div>;

  async function handleToggleTodo(todo) {
    const data = await toggleTodo({
      variables: { id: todo.id, done: !todo.done }
    });
    console.log(data);
  }

  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa4 f1-1">
      <h1 className="f2-2">
        GraphQL Checklist
        <span role="img" aria-label="Checkmark">
          ✅
        </span>
      </h1>
      {/* Todo Form */}
      <form>
        <input
          type="text"
          className="pa2 f4 b--dashed"
          placeholder="enter you todo item"
        ></input>
        <button className="pa2 f4 bg-green" type="submit">
          {" "}
          Create
        </button>
      </form>
      {/* Todo List */}
      <div className="flex flex-column items-center justify-center">
        {data.todos.map(todo => (
          <p key={todo.id} onDoubleClick={() => handleToggleTodo(todo)}>
            <span className={`pointer list pa1 f3 ${todo.done && "strike"}`}>
              {todo.text}
            </span>
            <button className="bn f3 bg-transparent">
              {" "}
              <span className="red">&times;</span>
            </button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;

import { clsx } from 'clsx';

export default function App() {
  return (
    <div className="flex flex-col gap-10 p-4">
      <div>
        <h1 className="text-4xl text-center">Supabase Test</h1>
        <p className="text-center text-gray-500">
          This is a test project to try out Supabase
        </p>
      </div>
      <CreateForm />
      <List />
    </div>
  );
}

function CreateForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      console.log(formData.get('title'));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-center text-xl">Create Task</h2>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          name="title"
          placeholder="Task title"
          className="border rounded-sm p-2 text-black"
        />
        <button className="border rounded-sm p-2 text-white" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

function List() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-center text-xl">Task List</h2>
      <ul className="flex flex-col gap-4">
        {TASKS.map((task) => (
          <li key={task.id}>
            <Item task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Item({ task }: { task: Task }) {
  return (
    <div
      className={clsx(
        task.completed_at && 'text-gray-500',
        'flex flex-col gap-2 p-2 border rounded-sm',
      )}
    >
      <span>{task.title}</span>
      <span>- Created: {new Date(task.created_at).toLocaleString()}</span>
      {Boolean(task.completed_at) && (
        <span>
          - Completed: {new Date(task.completed_at as string).toLocaleString()}
        </span>
      )}
    </div>
  );
}

interface Task {
  id: string;
  title: string;
  created_at: string;
  completed_at: string | null;
}

const TASKS: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    created_at: '2021-09-08T12:00:00.000Z',
    completed_at: null,
  },
  {
    id: '2',
    title: 'Task 2',
    created_at: '2021-09-08T12:00:00.000Z',
    completed_at: '2021-09-08T12:00:00.000Z',
  },
  {
    id: '3',
    title: 'Task 3',
    created_at: '2021-09-08T12:00:00.000Z',
    completed_at: null,
  },
];

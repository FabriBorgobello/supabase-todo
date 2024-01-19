import { Task } from '@/types';
import { clsx } from 'clsx';
import React from 'react';

interface Props {
  task: Task;
  handleUpdate: (id: Task['id'], partialTask: Partial<Task>) => Promise<void>;
  handleDelete: (id: Task['id']) => Promise<void>;
}

export function Item({ task, handleUpdate, handleDelete }: Props) {
  const [edit, setEdit] = React.useState(false);

  async function toggleStatus(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await handleUpdate(task.id, {
      completed_at: task.completed_at ? null : new Date().toISOString(),
    });
  }

  async function updateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    await handleUpdate(task.id, { title });
    setEdit(false);
  }

  async function deleteTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await handleDelete(task.id);
  }

  return (
    <div
      className={clsx(
        task.completed_at && 'text-gray-500',
        'flex flex-col gap-2 p-2 border rounded-sm cursor-pointer',
      )}
    >
      <span className="text-xl">#{task.id}</span>

      {edit ? (
        <form onSubmit={updateTask}>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            className="border rounded-sm p-2 text-black"
            defaultValue={task.title}
          />
          <button
            className="border rounded-sm p-2 text-white"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
          <button className="border rounded-sm p-2 text-white" type="submit">
            Save
          </button>
        </form>
      ) : (
        <span>{task.title}</span>
      )}
      <span>- Created: {new Date(task.created_at).toLocaleString()}</span>
      {Boolean(task.completed_at) && (
        <span>
          - Completed: {new Date(task.completed_at as string).toLocaleString()}
        </span>
      )}

      <button
        className="border rounded-sm p-2 text-white"
        onClick={() => setEdit(true)}
        disabled={edit}
      >
        Edit
      </button>
      <button
        className="border rounded-sm p-2 text-white"
        onClick={toggleStatus}
        disabled={edit}
      >
        {task.completed_at ? 'Undo' : 'Complete'}
      </button>
      <button
        className="border rounded-sm p-2 text-white"
        onClick={deleteTask}
        disabled={edit}
      >
        Delete
      </button>
    </div>
  );
}

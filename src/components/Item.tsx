import { Task } from '@/types';
import { clsx } from 'clsx';

export function Item({
  task,
  handleToggleStatus,
  handleDelete,
}: {
  task: Task;
  handleToggleStatus: (e: React.MouseEvent, task: Task) => Promise<void>;
  handleDelete: (e: React.MouseEvent, task: Task) => Promise<void>;
}) {
  return (
    <div
      className={clsx(
        task.completed_at && 'text-gray-500',
        'flex flex-col gap-2 p-2 border rounded-sm cursor-pointer',
      )}
      onClick={(e) => handleToggleStatus(e, task)}
    >
      <span>{task.title}</span>
      <span>- Created: {new Date(task.created_at).toLocaleString()}</span>
      {Boolean(task.completed_at) && (
        <span>
          - Completed: {new Date(task.completed_at as string).toLocaleString()}
        </span>
      )}
      <button
        className="border rounded-sm p-2 text-white"
        onClick={(e) => handleDelete(e, task)}
      >
        Delete
      </button>
    </div>
  );
}

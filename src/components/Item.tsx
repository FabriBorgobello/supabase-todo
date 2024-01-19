import { Task } from '@/types';
import { clsx } from 'clsx';

export function Item({ task }: { task: Task }) {
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

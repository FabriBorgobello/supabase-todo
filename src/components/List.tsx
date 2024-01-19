import * as React from 'react';
import { supabase } from '@/database';
import { Item } from '@/components/Item';
import { Task } from '@/types';

export function List() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');

  React.useEffect(() => {
    async function fetchTasks() {
      try {
        setStatus('loading');
        const data = await supabase.list();
        setTasks(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    }
    fetchTasks();
  }, []);

  async function handleUpdate(id: Task['id'], partialTask: Partial<Task>) {
    const updated = await supabase.update(id, partialTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updated : task)),
    );
  }

  async function handleDelete(id: Task['id']) {
    await supabase.delete(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-center text-xl">Task List</h2>

      {/* Empty State */}
      {status === 'success' && tasks.length === 0 && (
        <div className="text-center text-gray-500">No tasks</div>
      )}

      {/* Loading State */}
      {status === 'loading' && (
        <div className="text-center text-gray-500">Loading...</div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="text-center text-gray-500">Error</div>
      )}

      {/* Success State */}
      {status === 'success' && tasks.length > 0 && (
        <>
          <div className="text-center text-gray-500">
            {tasks.length} tasks found
          </div>
          <ul className="flex flex-col gap-4">
            {tasks.map((task) => (
              <Item
                task={task}
                key={task.id}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

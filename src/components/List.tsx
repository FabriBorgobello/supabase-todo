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
              <Item task={task} key={task.id} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

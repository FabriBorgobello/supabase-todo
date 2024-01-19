import { supabase } from '@/database';

export function CreateForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const task = await supabase.create({ title });
      console.log(task);
      e.currentTarget.reset();
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

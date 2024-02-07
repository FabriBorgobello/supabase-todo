import { CreateForm } from '@/components/CreateForm';
import { List } from '@/components/List';

export default function App() {
  return (
    <div className='flex flex-col gap-10 p-4 max-w-2xl mx-auto'>
      <div>
        <h1 className='text-4xl text-center'>Supabase Test</h1>
        <p className='text-center text-gray-500'>
          This is a test project to try out Supabase
        </p>
      </div>
      <CreateForm />
      <List />
    </div>
  );
}

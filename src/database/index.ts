import { config } from '@/config';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';
import { Task } from '@/types';

class SupabaseClient {
  private client;

  constructor() {
    this.client = createClient<Database>(
      config.VITE_SUPABASE_URL,
      config.VITE_SUPABASE_ANON_KEY,
    );
  }

  async list() {
    const { data, error } = await this.client
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;

    return data;
  }

  async retrieve(id: number) {
    const { data, error } = await this.client
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;

    return data;
  }

  async create(task: { title: string }) {
    const { data, error } = await this.client
      .from('tasks')
      .insert([{ title: task.title }])
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async update(id: Task['id'], task: Partial<Task>) {
    const { data, error } = await this.client
      .from('tasks')
      .update(task)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;

    return data;
  }

  async delete(id: number) {
    const { error } = await this.client.from('tasks').delete().eq('id', id);
    if (error) throw error;
  }
}

export const supabase = new SupabaseClient();

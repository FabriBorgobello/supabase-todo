import { config } from '@/config';
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

export class SupabaseClient {
  private client;

  constructor() {
    this.client = createClient<Database>(
      config.VITE_SUPABASE_URL,
      config.VITE_SUPABASE_ANON_KEY,
    );
  }

  async list() {
    try {
      const { data, error } = await this.client
        .from('todos')
        .select('*')
        .order('id', { ascending: false });
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async retrieve(id: string) {
    try {
      const { data, error } = await this.client
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async create(task: { title: string }) {
    try {
      const { data, error } = await this.client
        .from('tasks')
        .insert([{ title: task.title }])
        .select();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: string, task: { title: string }) {
    try {
      const { data, error } = await this.client
        .from('tasks')
        .update({ title: task.title })
        .eq('id', id)
        .select();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: string) {
    try {
      const { data, error } = await this.client
        .from('tasks')
        .delete()
        .eq('id', id);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

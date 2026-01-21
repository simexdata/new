import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Debug() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      const { data, error } = await supabase.from('employees').select('*').limit(1);
      setInfo({
        envUrl: import.meta.env.VITE_SUPABASE_URL,
        envKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'present' : 'missing',
        session: session?.data?.session ? 'present' : 'missing',
        employeesSelectOk: !error && Array.isArray(data),
        employeesError: error?.message || null,
        sampleRow: data?.[0] || null,
      });
      console.log('DEBUG', { session, data, error });
    })();
  }, []);

  return (
    <pre style={{
      padding: 16,
      background: '#f1f5f9',
      border: '1px solid #e2e8f0',
      borderRadius: 8,
      fontSize: 12,
      maxWidth: 900,
      margin: '16px auto'
    }}>
      {JSON.stringify(info, null, 2)}
    </pre>
  );
}

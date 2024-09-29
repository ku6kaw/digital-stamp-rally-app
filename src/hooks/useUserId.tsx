import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.sub && user.sub.user_id) {
      setUserId(user.sub.user_id);
      console.log('user_id:', user.sub.user_id);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return userId;
};

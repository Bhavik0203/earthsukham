import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { API_BASE_URL } from '../lib/api';
import { useRouter } from 'next/navigation';

export function usePropertyActions() {
  const [savedProperties, setSavedProperties] = useState<string[]>([]);
  const [comparedProperties, setComparedProperties] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('webUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id);
        fetchUserProperties(parsedUser.id);
      } catch (e) {
        console.error('Error parsing user data', e);
      }
    }
  }, []);

  const fetchUserProperties = async (id: string) => {
    try {
      const [savedRes, compareRes] = await Promise.all([
        fetch(`${API_BASE_URL}/user-properties/saved-properties?webUserId=${id}`),
        fetch(`${API_BASE_URL}/user-properties/property-comparisons?webUserId=${id}`)
      ]);

      if (savedRes.ok) {
        const savedData = await savedRes.json();
        setSavedProperties(savedData.map((item: any) => item.propertyId));
      }

      if (compareRes.ok) {
        const compareData = await compareRes.json();
        setComparedProperties(compareData.map((item: any) => item.propertyId));
      }
    } catch (error) {
      console.error('Error fetching user properties', error);
    }
  };

  const toggleSave = async (propertyId: string) => {
    if (!userId) {
      toast.error('Please login to save properties');
      router.push('/login');
      return;
    }

    // Optimistic UI update
    const isCurrentlySaved = savedProperties.includes(propertyId);
    if (isCurrentlySaved) {
      setSavedProperties(prev => prev.filter(id => id !== propertyId));
    } else {
      setSavedProperties(prev => [...prev, propertyId]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/user-properties/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webUserId: userId, propertyId })
      });
      const data = await res.json();
      
      if (res.ok) {
        if (data.action === 'saved') {
          toast.success('Property saved!');
        } else {
          toast.success('Property removed from saved list');
        }
      } else {
        throw new Error(data.message || 'Failed to toggle save');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save property');
      // Revert optimistic update
      fetchUserProperties(userId);
    }
  };

  const toggleCompare = async (propertyId: string) => {
    if (!userId) {
      toast.error('Please login to compare properties');
      router.push('/login');
      return;
    }

    // Optimistic UI update
    const isCurrentlyCompared = comparedProperties.includes(propertyId);
    if (isCurrentlyCompared) {
      setComparedProperties(prev => prev.filter(id => id !== propertyId));
    } else {
      if (comparedProperties.length >= 4) {
        toast.error('You can only compare up to 4 properties at a time.');
        return;
      }
      setComparedProperties(prev => [...prev, propertyId]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/user-properties/compare`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webUserId: userId, propertyId })
      });
      const data = await res.json();
      
      if (res.ok) {
        if (data.action === 'added') {
          toast.success('Added to comparison');
        } else {
          toast.success('Removed from comparison');
        }
      } else {
        throw new Error(data.message || 'Failed to toggle compare');
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Failed to compare property');
      // Revert optimistic update
      fetchUserProperties(userId);
    }
  };

  const isSaved = (propertyId: string) => savedProperties.includes(propertyId);
  const isCompared = (propertyId: string) => comparedProperties.includes(propertyId);

  return {
    savedProperties,
    comparedProperties,
    toggleSave,
    toggleCompare,
    isSaved,
    isCompared
  };
}

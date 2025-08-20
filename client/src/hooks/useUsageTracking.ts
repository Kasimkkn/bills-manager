
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'invoice-usage-tracking';
const FREE_DOWNLOADS_LIMIT = 3;

interface UsageData {
  downloadsUsed: number;
  lastResetDate: string;
}

export const useUsageTracking = () => {
  const [downloadsUsed, setDownloadsUsed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const data: UsageData = JSON.parse(savedData);
        setDownloadsUsed(data.downloadsUsed);
      } catch (error) {
        console.log('No usage data found');
      }
    }
  }, []);

  const incrementDownloadCount = () => {
    const newCount = downloadsUsed + 1;
    
    if (newCount > FREE_DOWNLOADS_LIMIT) {
      setShowUpgradeModal(true);
      return false; // Prevent download
    }
    
    setDownloadsUsed(newCount);
    
    const usageData: UsageData = {
      downloadsUsed: newCount,
      lastResetDate: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usageData));
    return true; // Allow download
  };

  const getRemainingDownloads = () => {
    return Math.max(0, FREE_DOWNLOADS_LIMIT - downloadsUsed);
  };

  const closeUpgradeModal = () => {
    setShowUpgradeModal(false);
  };

  return {
    downloadsUsed,
    remainingDownloads: getRemainingDownloads(),
    showUpgradeModal,
    incrementDownloadCount,
    closeUpgradeModal,
  };
};

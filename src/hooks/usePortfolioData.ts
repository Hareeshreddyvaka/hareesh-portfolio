import { useState, useEffect } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { portfolioSeedData } from '../data/portfolioSeed';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(portfolioSeedData);
  const [error, setError] = useState<Error | null>(null);
  const isLoading = false;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/portfolio.json');
        if (!response.ok) throw new Error('Failed to load portfolio data');
        const portfolioData: PortfolioData = await response.json();
        setData(portfolioData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error loading portfolio API'));
      }
    };
    
    loadData();
  }, []);

  return { data, isLoading, error };
}

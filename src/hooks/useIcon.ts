import { useState, useEffect } from "react";
import { IconData, UseIconOptions, UseIconResult } from "../types";

// Simple in-memory cache
const iconCache = new Map<string, { data: IconData; timestamp: number }>();

const DEFAULT_API_BASE_URL = "http://localhost:3000";
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export function useIcon(
  name: string,
  options: UseIconOptions = {}
): UseIconResult {
  const { apiBaseUrl = DEFAULT_API_BASE_URL, cacheTime = DEFAULT_CACHE_TIME } =
    options;

  const [data, setData] = useState<IconData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setError("Icon name is required");
      setLoading(false);
      return;
    }

    const cacheKey = `${apiBaseUrl}:${name}`;
    const cached = iconCache.get(cacheKey);

    // Check if we have valid cached data
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      setData(cached.data);
      setLoading(false);
      setError(null);
      return;
    }

    // Fetch icon from API
    const fetchIcon = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/api/icons/${name}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch icon: ${response.statusText}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch icon");
        }

        const iconData = result.data;

        // Cache the result
        iconCache.set(cacheKey, {
          data: iconData,
          timestamp: Date.now(),
        });

        setData(iconData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchIcon();
  }, [name, apiBaseUrl, cacheTime]);

  return { data, loading, error };
}

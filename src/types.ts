export interface IconData {
  id: number;
  name: string;
  category?: string;
  tags: string[];
  svg_code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  apiBaseUrl?: string;
}

export interface UseIconOptions {
  apiBaseUrl?: string;
  cacheTime?: number;
}

export interface UseIconResult {
  data: IconData | null;
  loading: boolean;
  error: string | null;
}

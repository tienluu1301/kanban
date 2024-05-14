import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type ReturnType = boolean;

export function useActiveLink(path: string): ReturnType {
  const pathname = usePathname();

  const currentPath = path === '/' ? '/' : `${path}/`;

  const normalActive = pathname === currentPath;

  return normalActive;
}

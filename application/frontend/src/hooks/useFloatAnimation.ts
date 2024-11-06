import { keyframes } from '@emotion/react';
import { useMemo } from 'react';

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const useFloatAnimation = () => {
  return useMemo(() => `${float} 6s ease-in-out infinite`, []);
};

import { useEffect } from 'react';

import type * as React from 'react';

type UseOutsideClickClose = {
  IsSidebarOpen: boolean;
  onChange: (newValue: boolean) => void;
  onClose?: () => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
};

export const useOutsideClickClose = ({
  IsSidebarOpen,
  rootRef,
  onClose,
  onChange,
}: UseOutsideClickClose): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        IsSidebarOpen && onClose?.();
        onChange?.(false);
      }
    };

    if (!IsSidebarOpen) {
      return;
    }

    window.addEventListener('mousedown', handleClick);

    return (): void => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [onClose, onChange, IsSidebarOpen]);
};

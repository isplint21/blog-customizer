import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import arrowDown from 'src/images/arrow-down.svg';
import { Text } from 'src/ui/text';

import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Option } from './Option';

import type { MouseEventHandler } from 'react';
import type { OptionType } from 'src/constants/articleProps';

import styles from './Select.module.scss';

type SelectProps = {
  selected: OptionType | null;
  options: OptionType[];
  placeholder?: string;
  onChange?: (selected: OptionType) => void;
  onClose?: () => void;
  title?: string;
};

export const Select = (props: SelectProps): React.JSX.Element => {
  const { options, placeholder, selected, onChange, onClose, title } = props;
  const [IsSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const optionClassName = selected?.optionClassName ?? '';

  useOutsideClickClose({
    IsSidebarOpen,
    rootRef,
    onClose,
    onChange: setIsSidebarOpen,
  });

  useEnterSubmit({
    placeholderRef,
    onChange: setIsSidebarOpen,
  });

  const handleOptionClick = (option: OptionType): void => {
    setIsSidebarOpen(false);
    onChange?.(option);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsSidebarOpen((IsSidebarOpen) => !IsSidebarOpen);
  };

  return (
    <div className={styles.container}>
      {title && (
        <>
          <Text size={12} weight={800} uppercase>
            {title}
          </Text>
        </>
      )}
      <div
        className={styles.selectWrapper}
        ref={rootRef}
        data-is-active={IsSidebarOpen}
        data-testid="selectWrapper"
      >
        <img src={arrowDown} alt="иконка стрелочки" className={styles.arrow} />
        <div
          className={clsx(
            styles.placeholder,
            (styles as Record<string, string>)[optionClassName]
          )}
          data-status={status}
          data-selected={!!selected?.value}
          onClick={handlePlaceHolderClick}
          role="button"
          tabIndex={0}
          ref={placeholderRef}
        >
          <Text
            family={
              isFontFamilyClass(selected?.className) ? selected?.className : undefined
            }
          >
            {selected?.title ?? placeholder}
          </Text>
        </div>
        {IsSidebarOpen && (
          <ul className={styles.select} data-testid="selectDropdown">
            {options
              .filter((option) => selected?.value !== option.value)
              .map((option) => (
                <Option
                  key={option.value}
                  option={option}
                  onClick={() => handleOptionClick(option)}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

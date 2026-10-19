import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from '@/constants/articleProps';
import { ArrowButton } from '@/ui/arrow-button';
import { Button } from '@/ui/button';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

import type { ArticleStateType, OptionType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: TArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = useState<ArticleStateType>(defaultArticleState);
  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as Node;
    if (sidebarRef.current?.contains(target)) return;
    if (buttonRef.current?.contains(target)) return;
    setIsOpen(false);
  };
  const handleFontFamilyChange = (option: OptionType): void => {
    setDraft((prev) => ({ ...prev, fontFamilyOption: option }));
  };
  const handleFontSizeChange = (option: OptionType): void => {
    setDraft((prev) => ({ ...prev, fontSizeOption: option }));
  };
  const handleFontColorChange = (option: OptionType): void => {
    setDraft((prev) => ({ ...prev, fontColor: option }));
  };
  const handleBackgroundColorChange = (option: OptionType): void => {
    setDraft((prev) => ({ ...prev, backgroundColor: option }));
  };
  const handleContentWidthChange = (option: OptionType): void => {
    setDraft((prev) => ({ ...prev, contentWidth: option }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(draft);
  };
  const handleReset = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setDraft(defaultArticleState);
    onApply(defaultArticleState);
  };
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      <div ref={buttonRef}>
        <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      </div>
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, isOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text weight={800} size={31} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draft.fontFamilyOption}
            onChange={handleFontFamilyChange}
          />
          <RadioGroup
            name="font-size"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            onChange={handleFontSizeChange}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draft.fontColor}
            onChange={handleFontColorChange}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draft.backgroundColor}
            onChange={handleBackgroundColorChange}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={draft.contentWidth}
            onChange={handleContentWidthChange}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};

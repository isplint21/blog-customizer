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
  onApply: (newArticleParams: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: TArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [articleParams, setArticleParams] =
    useState<ArticleStateType>(defaultArticleState);
  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as Node;
    if (sidebarRef.current?.contains(target)) return;
    if (buttonRef.current?.contains(target)) return;
    setIsSidebarOpen(false);
  };
  const handleChange =
    (field: keyof ArticleStateType): ((option: OptionType) => void) =>
    (option: OptionType): void => {
      setArticleParams((prev) => ({ ...prev, [field]: option }));
    };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(articleParams);
  };
  const handleReset = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setArticleParams(defaultArticleState);
    onApply(defaultArticleState);
  };
  useEffect(() => {
    if (!isSidebarOpen) return;
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);
  return (
    <>
      <div ref={buttonRef}>
        <ArrowButton
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, isSidebarOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text weight={800} size={31} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={articleParams.fontFamilyOption}
            onChange={handleChange('fontFamilyOption')}
          />
          <RadioGroup
            name="font-size"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={articleParams.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={articleParams.fontColor}
            onChange={handleChange('fontColor')}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={articleParams.backgroundColor}
            onChange={handleChange('backgroundColor')}
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={articleParams.contentWidth}
            onChange={handleChange('contentWidth')}
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

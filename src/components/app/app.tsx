import { defaultArticleState } from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useState } from 'react';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { ArticleStateType } from '@/constants/articleProps';
import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  const [appliedSettings, setAppliedSettings] =
    useState<ArticleStateType>(defaultArticleState);
  const handleApply = (settings: ArticleStateType): void => {
    setAppliedSettings(settings);
  };
  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedSettings.fontFamilyOption.value,
          '--font-size': appliedSettings.fontSizeOption.value,
          '--font-color': appliedSettings.fontColor.value,
          '--container-width': appliedSettings.contentWidth.value,
          '--bg-color': appliedSettings.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm onApply={handleApply} />
      <Article />
    </main>
  );
};

import css from './LayoutNotes.module.css';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NotesLayout({ children, sidebar }: Props) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </div>
  );
}

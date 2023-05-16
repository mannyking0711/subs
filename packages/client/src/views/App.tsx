import React, { FC } from 'react';
import { SideBar } from '~/components/Layout/SideBar';
import { MainView } from '~/views/Main/MainView';

export const App: FC<unknown> = () => {
  return (
    <aside className="flex">
      <SideBar />

      <div className="p-8 flex-1">
        <MainView />
      </div>
    </aside>
  );
};

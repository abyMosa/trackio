import React, { ReactNode } from 'react';

const LayoutWrapper = (ParentComponent: any, ChildComponent: any) => {

  return (props: any) => (
    <ParentComponent>
      <ChildComponent />
    </ParentComponent>
  );
};

export default LayoutWrapper;

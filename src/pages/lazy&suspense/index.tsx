import React, { Suspense } from "react";
const ChildCompo = React.lazy(() => import("./child"));

export default function() {
  console.log(ChildCompo); // 加载进来的是一个含有$$typeof: Symbol的对象
  console.log(Suspense); // React.Suspense只是一个Symbol
  return (
    <Suspense fallback={<p>loading...</p>}>
      <p>lazy</p>
      <ChildCompo />
    </Suspense>
  );
}

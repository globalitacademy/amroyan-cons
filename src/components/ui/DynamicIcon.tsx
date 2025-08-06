import React, { lazy, Suspense } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import type { LucideProps } from "lucide-react";

const fallback = <div className="inline-block" style={{ width: 24, height: 24 }} />;

export interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);
  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default DynamicIcon;

"use client";
interface InlineErrorProps {
  children: React.ReactNode;
  classes: string;
}

const InlineError = ({ children, classes }: InlineErrorProps) => {
  return <div className={classes}>{children}</div>;
};

export default InlineError;

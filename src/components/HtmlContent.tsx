type HtmlContentProps = {
  content: string | null | undefined;
  className?: string;
};

export default function HtmlContent({ content }: HtmlContentProps) {
  if (!content) return null;

  return (
    <div
      className={`prose`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

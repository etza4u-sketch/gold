
import React from 'react';

interface ContentDisplayProps {
  title: string;
  content: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ title, content }) => {
  return (
    <article className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-lg prose-headings:text-amber-300">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      {content.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </article>
  );
};

export default ContentDisplay;

import { notFound } from "next/navigation";
import { getProjects } from "@/lib/projects";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import CodeBlock from "@/app/components/CodeBlock";

const markdownComponents: Components = {

  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-12 mb-6 text-white">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-10 mb-5 text-white">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-xl font-semibold mt-8 mb-4 text-white">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-300 leading-8 mb-6 text-[17px]">
      {children}
    </p>
  ),

  li: ({ children }) => (
    <li className="mb-2 leading-7 text-gray-300">
      {children}
    </li>
  ),

  img: ({ src, alt }) => (
    <div className="my-10">
      <img
        src={src || ""}
        alt={alt || ""}
        className="rounded-xl border border-white/10 shadow-lg"
      />
    </div>
  ),

  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      return (
        <CodeBlock
          language={match[1]}
          value={String(children).replace(/\n$/, "")}
        />
      );
    }

    return (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    );
  },

};

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projects = getProjects();

  const project = projects.find(
    (p) => String(p.id) === String(id)
  );

  if (!project) return notFound();

  return (
    <section className="max-w-3xl mx-auto px-6 pt-40 pb-24">
      <span className="text-xs px-3 py-1 rounded bg-blue-500/10 text-blue-500">
        {project.date}
      </span>

      <h1 className="text-4xl font-bold mt-4 mb-6">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <article className="prose dark:prose-invert max-w-none">
        <ReactMarkdown components={markdownComponents}>
          {project.description}
        </ReactMarkdown>
      </article>
    </section>
  );
}
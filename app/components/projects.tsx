import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  date: string;
};

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch("https://devops-portfolio-gamma-seven.vercel.app/api/projects", {
      cache: "no-store",
    });

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  const latestProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden px-6 mt-1">

      {/* HERO TITLE */}
      <div className="max-w-7xl mx-auto mb-24 flex justify-center">
        <div
          className="
          px-12 py-2
          rounded-2xl
          bg-[linear-gradient(120deg,rgba(30,41,59,0.9),rgba(15,23,42,0.95))]
          border border-white/10
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
          text-center
        "
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Latest DevOps Projects
          </h2>
        </div>
      </div>

      {/* PROJECT CARDS */}
      <div className="max-w-6xl mx-auto space-y-16">

        {latestProjects.map((project) => (
          <div
            key={project.id}
            className="
            relative overflow-hidden
            w-full
            px-12 py-12
            rounded-3xl
            bg-[linear-gradient(120deg,rgba(15,23,42,0.85),rgba(30,41,59,0.9))]
            border border-blue-500/20
            shadow-[0_0_60px_rgba(0,0,0,0.6)]
            hover:border-blue-400/40
            hover:shadow-[0_0_90px_rgba(59,130,246,0.18)]
            transition-all duration-300
          "
          >
            {/* Glow Overlay */}
            <div
              className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_45%)]
              pointer-events-none
            "
            />

            {/* DATE */}
            <span
              className="
              inline-flex items-center gap-2
              px-5 py-2 mb-6
              text-sm rounded-xl
              bg-blue-500/15 text-blue-300
              border border-blue-400/20
              backdrop-blur-md
            "
            >
              📅 {project.date}
            </span>

            {/* TITLE */}
            <Link
              href={`/projects/${project.id}`}
              className="
              block text-white
              hover:text-blue-400
              font-semibold
              text-2xl md:text-3xl
              mb-4 max-w-4xl
              transition
            "
            >
              {project.title}
            </Link>

            {/* DESCRIPTION */}
            <p
              className="
              text-gray-400
              mb-6 leading-relaxed
              max-w-3xl
            "
            >
              {project.description
                .replace(/!\[.*?\]\(.*?\)/g, "")   
                .replace(/```[\s\S]*?```/g, "")    
                .replace(/#+\s/g, "")              
                .substring(0, 240)
              }...
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="
                  px-3 py-1.5 text-xs rounded-lg
                  bg-blue-500/10 text-blue-300
                  border border-blue-400/20
                "
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* READ MORE */}
            <Link
              href={`/projects/${project.id}`}
              className="text-blue-400 text-sm font-medium hover:text-blue-300"
            >
              Read more →
            </Link>
          </div>
        ))}

      </div>
    </section>
  );
}
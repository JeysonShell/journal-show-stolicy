import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProject } from "@/lib/actions/projects";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  const action = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Редактирование проекта</h1>
      <p className="mt-2 text-muted-foreground">{project.name}</p>
      <div className="mt-10">
        <ProjectForm
          action={action}
          initial={{
            name: project.name,
            description: project.description,
            externalUrl: project.externalUrl,
            accentColor: project.accentColor,
          }}
        />
      </div>
    </div>
  );
}

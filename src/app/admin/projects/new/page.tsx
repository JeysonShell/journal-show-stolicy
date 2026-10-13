import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Новый проект</h1>
      <p className="mt-2 text-muted-foreground">
        Slug сгенерируется автоматически из названия.
      </p>
      <div className="mt-10">
        <ProjectForm action={createProject} submitLabel="Создать" />
      </div>
    </div>
  );
}

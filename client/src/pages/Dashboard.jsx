import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  // 🔹 Fetch projects
  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Fetch tasks for selected project
  useEffect(() => {
    if (!selectedProject) return;

    API.get("/tasks")
      .then((res) => {
        const filtered = res.data.filter(
          (t) => t.projectId === selectedProject.id
        );
        setTasks(filtered);
      })
      .catch((err) => console.log(err));
  }, [selectedProject]);

  // 🔹 Fetch members (IMPORTANT)
  useEffect(() => {
    if (!selectedProject) return;

    API.get(`/projects/${selectedProject.id}/members`)
      .then((res) => {
        console.log("Members:", res.data); // 🔥 debug
        setMembers(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedProject]);

  // 🔹 Create project
  const createProject = async () => {
    try {
      const res = await API.post("/projects", { name: projectName });
      setProjects([...projects, res.data]);
      setProjectName("");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Add member
  const addMember = async () => {
    if (!selectedProject) {
      alert("Select project first");
      return;
    }

    try {
      await API.post(`/projects/${selectedProject.id}/add-member`, {
        email: memberEmail,
      });

      alert("Member added!");
      setMemberEmail("");

      // 🔄 refresh members list
      const res = await API.get(`/projects/${selectedProject.id}/members`);
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Create task with assignment
  const createTask = async () => {
    if (!selectedProject) {
      alert("Select a project first");
      return;
    }

    try {
      const res = await API.post("/tasks", {
        title,
        dueDate: new Date(),
        projectId: selectedProject.id,
        assignedTo: assignedTo || null,
      });

      setTasks([...tasks, res.data]);
      setTitle("");
      setAssignedTo("");
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Mark task done
  const markDone = async (id) => {
    try {
      await API.patch(`/tasks/${id}`, { status: "DONE" });

      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, status: "DONE" } : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Stats
  const completed = tasks.filter((t) => t.status === "DONE").length;
  const pending = tasks.length - completed;
  const overdue = tasks.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== "DONE"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* 🔹 PROJECTS */}
      <h2 className="text-xl font-semibold mb-2">Projects</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="New Project"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white px-4 rounded"
          onClick={createProject}
        >
          Create
        </button>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {projects.map((p) => (
          <button
            key={p.id}
            className={`px-3 py-1 rounded ${
              selectedProject?.id === p.id
                ? "bg-purple-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedProject(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 🔹 TEAM */}
      {selectedProject?.role === "ADMIN" && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Add Team Member</h3>

          <div className="flex gap-2">
            <input
              className="border p-2 rounded"
              placeholder="Member Email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            <button
              className="bg-indigo-500 text-white px-3 rounded"
              onClick={addMember}
            >
              Add Member
            </button>
          </div>
        </div>
      )}

      {/* 🔹 TASKS */}
      <h2 className="text-xl font-semibold mb-2">
        Tasks {selectedProject && `- ${selectedProject.name}`}
      </h2>

      {/* 🔹 STATS */}
      <div className="mb-4">
        <p>Total: {tasks.length}</p>
        <p>Completed: {completed}</p>
        <p>Pending: {pending}</p>
        <p className="text-red-500">Overdue: {overdue}</p>
      </div>

      {/* 🔹 CREATE TASK */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          value={title}
          className="border p-2 rounded"
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 👇 ASSIGN DROPDOWN */}
        <select
          className="border p-2 rounded"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Assign to</option>

          {members.length === 0 ? (
            <option disabled>No members found</option>
          ) : (
            members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.email}
              </option>
            ))
          )}
        </select>

        <button
          className="bg-green-500 text-white px-4 rounded"
          onClick={createTask}
          disabled={!title || !selectedProject}
        >
          Add
        </button>
      </div>

      {/* 🔹 TASK LIST */}
      <div className="grid gap-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <span>
              {t.title} -
              <span className="ml-2">{t.status}</span>
              <span className="ml-2 text-blue-500 text-sm">
                ({t.assignedTo || "Unassigned"})
              </span>
            </span>

            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => markDone(t.id)}
            >
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
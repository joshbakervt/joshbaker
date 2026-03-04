import './Projects.css'

const projects = [
  {
    name: 'Project One',
    description: 'A short description of what this project does and why it matters.',
    url: '#',
    tags: ['React', 'Node.js'],
  },
  {
    name: 'Project Two',
    description: 'Another project showcasing a different set of skills and technologies.',
    url: '#',
    tags: ['Python', 'PostgreSQL'],
  },
  {
    name: 'Project Three',
    description: 'A third project with its own unique purpose and tech stack.',
    url: '#',
    tags: ['Go', 'Docker'],
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.name} className="project-card">
            <a href={project.url} target="_blank" rel="noreferrer">
              <div className="project-header">
                <span className="project-name">{project.name}</span>
                <span className="project-arrow">↗</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

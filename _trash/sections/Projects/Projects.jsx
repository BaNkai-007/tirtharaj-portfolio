import data from '../../data/portfolio.json';
import ProjectCard from './ProjectCard';
import './Projects.css';

const { projects } = data;

export default function Projects() {
  return (
    <div className="projects">
      <span className="projects__label">// Built</span>
      <h2 className="projects__heading">
        Core<br />Deployments
      </h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

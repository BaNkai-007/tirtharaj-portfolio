import data from '../../data/portfolio.json';
import './Skills.css';

const { skills } = data;

const categoryLabels = {
  languages: 'Languages',
  frameworks: 'Frameworks',
  tools: 'Tools',
  core: 'Core Competencies',
  practices: 'Professional Practices',
};

export default function Skills() {
  return (
    <div className="skills">
      <h2 className="skills__heading">Skills</h2>
      <div className="skills__grid">
        {Object.entries(skills).map(([key, items]) => (
          <div key={key} className="skills__group">
            <h3 className="skills__category">{categoryLabels[key] || key}</h3>
            <ul className="skills__list">
              {items.map((skill) => (
                <li key={skill} className="skills__pill">{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

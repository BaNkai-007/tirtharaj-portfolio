import data from '../../data/portfolio.json';
import './About.css';

const { person, achievements } = data;

export default function About() {
  return (
    <div className="about">
      <h2 className="about__heading">About</h2>

      <div className="about__education">
        <h3 className="about__subheading">Education</h3>
        <p className="about__degree">{person.education.degree}</p>
        <p className="about__institution">
          {person.education.institution}
          <span className="about__period"> · {person.education.period}</span>
        </p>
      </div>

      <div className="about__achievements">
        <h3 className="about__subheading">Achievements</h3>
        <ul className="about__list">
          {achievements.map((item) => (
            <li key={item.title} className="about__item">
              <span className="about__distinction">{item.distinction}</span>
              <span className="about__title">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

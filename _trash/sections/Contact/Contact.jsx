import data from '../../data/portfolio.json';
import './Contact.css';

const { person } = data;

export default function Contact() {
  return (
    <div className="contact">
      <h2 className="contact__heading">Get in Touch</h2>

      <div className="contact__links">
        <a
          className="contact__link data-emphasis"
          href={`mailto:${person.contact.email}`}
        >
          {person.contact.email}
        </a>

        <a
          className="contact__link data-emphasis"
          href={`https://github.com/${person.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub · {person.contact.github}
        </a>

        <a
          className="contact__link data-emphasis"
          href={`https://linkedin.com/in/${person.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn · {person.contact.linkedin}
        </a>
      </div>
    </div>
  );
}

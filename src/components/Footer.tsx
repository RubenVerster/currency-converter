import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
    <div className="footer w-full text-white p-4 text-center relative md:absolute">
      <div className="container w-6/12 flex flex-col items-center md:flex-row mx-auto justify-between">
        <div>
          <a
            href="https://rubenverster.com"
            rel="noreferrer"
            target="_blank"
            className="hover:text-blue-700"
          >
            Ruben Verster
          </a>{' '}
          &#169; 2021
        </div>
        <div className="hover:text-blue-700">
          <a
            className="flex items-center"
            rel="noreferrer"
            href="https://github.com/RubenVerster/currency-converter"
            target="_blank"
          >
            <DiGithub size={42} />
            Link to repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react';

const sponsors = [
  {
    name: 'SIG',
    link: 'https://sig.com/',
    className: 'sponsor sponsor-sig'
  },
  {
    name: 'Citadel',
    link: 'https://www.citadel.com/',
    className: 'sponsor sponsor-ci'
  },
  {
    name: 'Jane Street',
    link: 'https://www.janestreet.com',
    className: 'sponsor sponsor-js'
  },
  {
    name: 'DE Shaw',
    link: 'https://www.deshaw.com/',
    className: 'sponsor sponsor-de'
  },
  {
    name: 'Two Sigma',
    link: 'https://www.twosigma.com',
    className: 'sponsor sponsor-2s'
  },
  {
    name: 'IMC',
    link: 'https://www.imc.com/',
    className: 'sponsor sponsor-imc'
  },
];

const Sponsors = () => (
  <div className='section blue-grey lighten-4'>
    <div className='row container center-align'>
      <h4>Sponsors</h4>
      {
        sponsors.map((sponsor, key) => (
          <div className='col l4 m6 s12' key={key}>
            <a href={sponsor.link} target='_blank' className={sponsor.className}></a>
          </div>
        ))
      }
    </div>
  </div>
);

export default Sponsors;

import React from 'react';

const sponsors = [
  {
    name: 'CMU SCS',
    link: 'https://www.cs.cmu.edu/',
    className: 'sponsor sponsor-cm'
  },
  {
    name: 'Citadel',
    link: 'https://www.citadel.com/',
    className: 'sponsor sponsor-ci'
  },
  {
    name: 'Citadel Securities',
    link: 'https://www.citadelsecurities.com/',
    className: 'sponsor sponsor-cs'
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
    name: 'Jane Street',
    link: 'https://www.janestreet.com',
    className: 'sponsor sponsor-js'
  },
  {
    name: 'Expii',
    link: 'https://www.expii.com',
    className: 'sponsor sponsor-xp'
  },
  {
    name: 'Wolfram',
    link: 'https://www.wolfram.com',
    className: 'sponsor sponsor-wa'
  },
];

const Sponsors = () => (
  <div className='section blue-grey lighten-4'>
    <div className='row container center-align'>
      <h4>Sponsors</h4>
      {
        sponsors.map((sponsor, key) => (
          <div className='col l3 m6 s12' key={key}>
            <a href={sponsor.link} target='_blank' className={sponsor.className}></a>
          </div>
        ))
      }
    </div>
  </div>
);

export default Sponsors;

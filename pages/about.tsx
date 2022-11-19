import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.css';
import Navbar from './component/Navbar';

type contactItem = {
  key: number,
  icon: string,
  alt_icon: string,
  value: string,
  link: string | undefined
}

const contact_list: contactItem[] = [
  {
    key: 1, alt_icon: 'email icon', value: 'nabeelkahlil403@gmail.com', link: '/',
    icon: require('/public/icons/email-icon.svg')
  },
  {
    key: 2, alt_icon: 'linkdn icon', value: 'nabeel403', link: '/',
    icon: require('/public/icons/linkdin-icon.svg')
  },
]

const renderContactItem = (contact: contactItem) => {
  return <Link href={contact.link || '#'} >
    <div className={styles.contactItem} key={contact.key}>
      <Image
        src={contact.icon}
        alt={contact.alt_icon}
        width={30}
        height={30}
      />
      {contact.value}
      </div>
    </Link>
}

export default function About() {
  return (
    <div>
      <Navbar />
      <main className='main'>
        <section className="intro-section">
          <p>My name is Nabeel kahlil Maulana</p>
        </section>

        <div className={styles.contactContainer}>
          {contact_list.map(contact => renderContactItem(contact))}
        </div>

        <div className='experience-section'>
          list experience here
          <div className="job-container">
            <div className='job-icon-area'>
              <Image alt='btpn icon' src='' />
            </div>
            <div className="job-description">
              <h3>PT Bank BPTN</h3>
              <p className='job-desc-period'> February 2021 - February 2022</p>
              <p className='job-decs-title'>Fullstack Developer</p>
              <p className='job-desc-text'>
                Contribute on building Content Management System (CMS) by adding 
                and updating features from given requirements. 
                Colaborate as a team in agile development workflow.
                Apply visual on frontend and manage CRUD from database in multiple microservices.
              </p>
              <ul className='job-desc-points'>
                <li> Using MERN (MongoDB, ExpressJS, React, NodeJS)</li>
                <li> Contribute to multiple PWA sites</li>
                <li> Test Driven Developemnt</li>
                <li> Partake as Quality Assurance</li>
                <li> Build a personal software that automate testing using <Link target='_blank' href='https://github.com/chawza/excel2docx'>excel2web</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="education-section">
          list education history here
        </div>
        <div className="skill-section">
          <div className="software-section">
            list software skill
          </div>
          <div className="language-section">
            list language skill
          </div>
        </div>
      </main>
    </div>
  )
}
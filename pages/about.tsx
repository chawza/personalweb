import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.css';
import Navbar from './component/Navbar';

const briefcaseIcon = require('/public/icons/briefcase-icon.svg')

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
  {
    key: 3, alt_icon: 'Twitter Icon', value: 'Nabeel403', link: 'https://twitter.com/Nabeel403',
    icon: require('/public/icons/twitter-icon.svg')
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
          {/* <p>My name is Nabeel kahlil Maulana</p> */}
        </section>

        <div className={styles.contactContainer}>
          {contact_list.map(contact => renderContactItem(contact))}
        </div>

        <section className='experience-section'>
          {/* list job experience here */}
          <h1>Job Experience</h1>
          <div className={styles.jobContainer}>
            <div className={styles.iconArea}>
              <Image src={require('/public/icons/briefcase-icon.svg')} alt='btpn icon' width={50} height={50}/>
            </div>
            <div className="job-description">
              <p className={styles.descPeriod}> February 2021 - February 2022</p>
              <h2 className={styles.descInstitution}>PT Bank BPTN tbk.</h2>
              <p className='job-desc-text'>
                Working as <b>Fullstack Developer Intern</b> and contribute on building Content Management System (CMS) by adding 
                and updating features from given requirements. 
                Colaborate as a team in agile development workflow.
                Apply visual features on frontend and manage data from database in multiple microservices.
              </p>
              <ul className={styles.descUlPoints}>
                <li> Using MERN (MongoDB, ExpressJS, React, NodeJS)</li>
                <li> Contribute to multiple Progressive Web Apps</li>
                <li> Develop using Test Driven Developemnt</li>
                <li> Partake role of Quality Assurance</li>
                <li> Build a personal software that automate testing using <Link target='_blank' href='https://github.com/chawza/excel2docx'>excel2web</Link></li>
                <li> awarded as one of the "Best Intern 2021"</li>
              </ul>
            </div>
          </div>                             
        </section>

        <section className={styles.educationSection}>
          {/* list education history here */}
          <h1>Bina Nusantara University</h1>
          <div className={styles.educationItemContainer}>
            <div className={styles.iconArea}>
              <Image src={require('/public/icons/briefcase-icon.svg')} alt='btpn icon' width={50} height={50}/>
            </div>
            <div className={styles.educationDescriptionArea}>
              <p className={styles.descPeriod}> 2018 - 2022</p>
              <h2 className={styles.descInstitution}>PT Bank BPTN tbk.</h2>
              <p> Faculty of Computer Science </p>
              <p> Majoring in Intelligence System</p>
              <p> GPA 3.47 </p>
            </div>
          </div>                             
        </section>

        <div className="skill-section">
          <div className="software-section">
            {/* list software skill */}
          </div>
          <div className="language-section">
            {/* list language skill */}
          </div>
        </div>
      </main>
    </div>
  )
}
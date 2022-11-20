import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.css';
import Navbar from './component/Navbar';

const educationHat = require('/public/icons/universityhat-icon.svg')

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

        <section className={styles.sectionItem}>
          {/* list job experience here */}
          <h1 className={styles.heading1}>Job Experience</h1>
          <div className={styles.jobContainer}>
            <div className={styles.iconArea}>
              <Image src={require('/public/icons/briefcase-icon.svg')} alt='btpn icon' width={40} height={40}/>
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
                <li> Using <b>MERN</b> (MongoDB, ExpressJS, React, NodeJS)</li>
                <li> Contribute to multiple Progressive Web Apps</li>
                <li> Develop using Test Driven Developemnt (TTD)</li>
                <li> Partake a role of Quality Assurance</li>
                <li> Build a personal software that automate testing using <Link target='_blank' href='https://github.com/chawza/excel2docx'>excel2web</Link></li>
                <li> awarded as one of the &quot;Best Intern 2021&quot;</li>
              </ul>
            </div>
          </div>                             
        </section>

        <section className={styles.sectionItem}>
          <h1 className={styles.heading1}>Education History</h1>
          {/* list education history here */}

          <div className={styles.educationItemContainer}>
            <div className={styles.iconArea}>
              <Image src={educationHat} alt='btpn icon' width={40} height={40}/>
            </div>
            <div className={styles.educationDescriptionArea}>
              <p className={styles.descPeriod}> 2018 - 2022</p>
              <h2 className={styles.descInstitution}>Bina Nusantara University</h2>
              <p> Faculty of Computer Science </p>
              <p> Majoring in Intelligence System</p>
              <p> GPA 3.47 </p>
            </div>
          </div>
          <div className={styles.educationItemContainer}>
            <div className={styles.iconArea}>
              <Image src={educationHat} alt='btpn icon' width={40} height={40}/>
            </div>
            <div className={styles.educationDescriptionArea}>
              <p className={styles.descPeriod}> 2015 - 2018</p>
              <h2 className={styles.descInstitution}>SMAN 44</h2>
              <p> Art of Science </p>
            </div>
          </div>                             
        </section>

        <section className={styles.sectionItem}>
            {/* list software skill */}
            <h1 className={styles.heading1}>Programming Skills</h1>
            <div className={styles.sectionArea}>
              <div className={styles.sectionContent}>
                <h3>Web Frameworks / Library</h3>
                <h4>Experienced</h4>
                <ul>
                  <li>React</li>
                  <li>NodeJs</li>
                  <li>MongoDB</li>
                  <li>ExpressJs</li>
                </ul>
                <h4>Basic / learned</h4>
                <ul>
                  <li>NextJs</li>
                  <li>Django</li>
                  <li>Laravel</li>
                </ul>
              </div>
              <div className={styles.sectionContent}>
                <h3>Utility Tools</h3>
                <h4>Experienced</h4>
                <ul>
                  <li>Python</li>
                  <li>Javascript</li>
                </ul>
                <h4>Basic / learned</h4>
                <ul>
                  <li>Numpy</li>
                  <li>Pandas</li>
                  <li>Sqlite</li>
                  <li>Typescript</li>
                </ul>
              </div>
              <div className={styles.sectionContent}>
                <h3>Projects</h3>
                {/* TODO: Create a Card with Thumbnail for each projects showcase */}
                <ul>
                  <li><Link href='https://github.com/chawza/jetson-obstacle-avoidance'>Stereo Vision Robot</Link> (Python, OpenCV, Websocket)</li>
                  <ul>
                    <li>Build a 4 wheeled robot using stereo camera</li>
                    <li>Using OpenCV to detect and estimate obstacle in distance</li>
                    <li>Avoid obstacle on its path</li>
                  </ul>
                  <li><Link href='https://github.com/chawza/excel2docx'>excel2docx</Link> Documentation converter to automate QA</li>
                  <ul>
                    <li>Personal use for automating workflow</li>
                    <li>Create a python library and implement it in Azure cloud</li>
                    <li>Deploy static website as interface</li>
                    <li>Create GUI application for local processing</li>
                  </ul>
                  <li><Link href='https://github.com/chawza/jetson-obstacle-avoidance'>This website</Link> and blog (in progress) using NextJs</li>
                </ul>
              </div>
            </div>
        </section>

        <section className={styles.sectionItem}>
        <h1 className={styles.heading1}>Language Proficiency</h1>

            {/* list language skill */}
        </section>


      </main>
    </div>
  )
}
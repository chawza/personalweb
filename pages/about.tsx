import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/About.module.css';
import PageLayout from '../layout/PageLayout';

const icons = {
  briefCase: require('/public/icons/briefcase-icon.svg'),
  educationHat: require('/public/icons/universityhat-icon.svg'),
  terminal: require('/public/icons/bashterminal-icon.svg'),
  rocket: require('/public/icons/rocket-icon.svg')
}

export default function About() {
  return <PageLayout>
    <div className={styles.container}>
      {/* <section className="intro-section">
        <p>My name is Nabeel kahlil Maulana</p>
      </section> */}
      <section className={styles.sectionItem}>
        {/* list job experience here */}
        <div className={styles.sectionSide}>
          <div className={styles.iconArea}>
            <Image src={icons.briefCase} alt='Business Briefcase icon' width={40} height={40}/>
          </div>
        </div>

        <div className={styles.sectionContent}>
          <h1 className={styles.sectionHeading}>Job Experience</h1>

          <div className={styles.sectionItemContainer}>
            <div>
              <p className={styles.descPeriod}> February 2021 - February 2022</p>
              <h2 className={styles.descInstitution}>PT Bank BPTN tbk.</h2>
              <p>
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

        </div>
      </section>

      <section className={styles.sectionItem}>
        <div className={styles.sectionSide}>
          <div className={styles.iconArea}>
            <Image src={icons.educationHat} alt='graduate hat' width={40} height={40}/>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <h1 className={styles.sectionHeading}>Education History</h1>

          <div className={styles.sectionItemContainer}>
            <div className={styles.educationDescriptionArea}>
              <p className={styles.descPeriod}> 2018 - 2022</p>
              <h2 className={styles.descInstitution}>Bina Nusantara University</h2>
              <p> Faculty of Computer Science </p>
              <p> Majoring in Intelligence System</p>
              <p> GPA 3.47 </p>
            </div>
          </div>

          <div className={styles.sectionItemContainer}>
            <div className={styles.educationDescriptionArea}>
              <p className={styles.descPeriod}> 2015 - 2018</p>
              <h2 className={styles.descInstitution}>SMAN 44</h2>
              <p> Art of Science </p>
            </div>
          </div>    
        </div>                                   
      </section>

      <section className={styles.sectionItem}>
        <div className={styles.sectionSide}>
          <div className={styles.iconArea}>
            <Image src={icons.terminal} alt='Bash entripoint icon' width={40} height={40}/>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <h1 className={styles.sectionHeading}>Programming Skills</h1>
          <div className={styles.sectionItemContainer}>

            <div className={styles.sectionContent}>
              <h2>Web Frameworks / Library</h2>
              <div className={styles.programmingItemContainer}>
                <div>
                  <h3>Experienced</h3>
                  <ul>
                    <li>React</li>
                    <li>NodeJs</li>
                    <li>MongoDB</li>
                    <li>ExpressJs</li>
                  </ul>
                </div>
                <div>
                  <h3>Basic / learned</h3>
                  <ul>
                    <li>NextJs</li>
                    <li>Django</li>
                    <li>Laravel</li>
                  </ul>

                </div>
              </div>
            </div>
            
            <div className={styles.sectionContent}>
              <h2>Utility Tools</h2>
              <div className={styles.programmingItemContainer}>
                <div>
                  <h3>Experienced</h3>
                  <ul>
                    <li>Python</li>
                    <li>Javascript</li>
                  </ul>
                </div>
                <div>
                  <h3>Basic / learned</h3>
                  <ul>
                    <li>Numpy</li>
                    <li>Pandas</li>
                    <li>Sqlite</li>
                    <li>Typescript</li>
                  </ul>
                </div>
              </div>
              
            </div>

          </div>
          
        </div>
          
          <div className={styles.sectionArea}>
            <div className={styles.sectionContent}>
            </div>
          </div>
      </section>

      <section className={styles.sectionItem}>
        <div className={styles.sectionSide}>
          <div className={styles.iconArea}>
            <Image src={icons.rocket} alt='Rocket launch icon' width={40} height={40}/>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionHeading}>Projects</h2>
          {/* TODO: Create a Card with Thumbnail for each projects showcase */}
          <h3>
              <Link href='https://github.com/chawza/jetson-obstacle-avoidance'>Stereo Vision Robot</Link> (Python, OpenCV, Websocket).
          </h3>
          <ul>
            <li>Build a 4 wheeled robot using stereo camera</li>
            <li>Using OpenCV to detect and estimate obstacle in distance</li>
            <li>Detect and avoid obstacle on its path</li>
          </ul>
          <h3>
            <Link href='https://github.com/chawza/excel2docx'>excel2docx</Link> Documentation converter to automate QA.
          </h3>
          <ul>
            <li>Personal use for automating workflow</li>
            <li>Create a python library and implement it in Azure cloud</li>
            <li>Deploy static website as interface</li>
            <li>Create GUI application for local processing</li>
          </ul>
          <h3>
            <Link href='https://github.com/chawza/jetson-obstacle-avoidance'>This website</Link> and blog (in progress) using NextJs.
          </h3>
        </div>
      </section>

      {/* <section className={styles.sectionItem}>
        <h1 className={styles.heading1}>Language Proficiency</h1>

            list language skill
      </section> */}
    </div>
  </PageLayout>
}
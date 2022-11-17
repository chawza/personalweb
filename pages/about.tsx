import Image from 'next/image';
import style from '../styles/About.module.css';

const contact_list = [
  { key: 1, icon: '', alt_icon: 'email icon', value: 'nabeelkahlil403@gmail.com'},
  { key: 2, icon: '', alt_icon: 'linkdn icon', value: 'nabeel403'},
]

export default function About() {
  return (
    <div className="container">

      <main>
        <div className="intro-section">
          <p>My name is Nabeel kahlil Maulana</p>
          <ul>
            {contact_list.map(contact => <div
                className={style.contactRow}
                key={contact.key}
              >
                <Image
                  src={contact.icon}
                  alt={contact.alt_icon}
                />
                {contact.value}
              </div>)}
          </ul>

        </div>
        <div className='experience-section'>
          list experience here
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
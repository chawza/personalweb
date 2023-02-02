import Link from "next/link"
import Image from "next/image";

import styles from '../styles/component/ContactList.module.css';
type contactItem = {
  icon: string,
  alt_icon: string,
  value: string,
  link: string | undefined,
  target: string
}

const contact_list: contactItem[] = [
  {
    alt_icon: 'email icon', value: 'nabeelkahlil403@gmail.com', link: '/',
    icon: require('/public/icons/email-icon.svg'), target:''
  },
  {
    alt_icon: 'linkdn icon', value: 'nabeel403', link: 'https://www.linkedin.com/in/nabeel403/',
    icon: require('/public/icons/linkdin-icon.svg'), target:'_blank'
  },
  {
    alt_icon: 'Twitter Icon', value: 'Nabeel403', link: 'https://twitter.com/Nabeel403',
    icon: require('/public/icons/twitter-icon.svg'), target:'_blank'
  },
  {
    alt_icon: 'Github icon', value: 'Chawza', link: 'https://github.com/chawza',
    icon: require('/public/icons/github-icon.svg'), target:'_blank'
  }
]

const renderContactItem = (contact: contactItem, index: number) => {
  return <div className={styles.contactItem} key={index}>
    <Link href={contact.link || '#'} target='_blank'>
      <div>
        <Image
          src={contact.icon}
          alt={contact.alt_icon}
          width={30}
          height={30}
        />
        <p>{contact.value}</p>
      </div>
    </Link>
  </div>
}
const ContactList = () => {
  return <div className={styles.contactContainer}>
    {contact_list.map((contact, index) => renderContactItem(contact, index))}
  </div>
}

export default ContactList;
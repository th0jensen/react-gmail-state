import { useState } from 'react'
import Header from './components/Header.tsx'
import { initialEmails, Email } from './data/emails.ts'
import './styles/App.css'

function App() {
    const initialStarred = initialEmails.filter(
        (email) => (email.starred = true)
    )
    const initialRead = initialEmails.filter((email) => email.read === true)

    const [emails, setEmails] = useState<Array<Email>>(initialEmails)
    const [starred, setStarred] = useState<Array<Email>>(initialStarred)
    const [read, setRead] = useState<Array<Email>>(initialRead)
    const [showUnread, setShowUnread] = useState<boolean>(false)
    const [showStarred, setShowStarred] = useState<boolean>(false)

    type EmailProps = {
        email: Email
    }

    function ReadCheckbox({ email }: EmailProps) {
        const inRead = (): boolean => {
            if (read.includes(email)) {
                return true
            } else {
                return false
            }
        }

        const [isRead, setIsRead] = useState<boolean>(inRead)

        const toggleRead = () => {
            setIsRead((prev) => !prev)
            if (!isRead) {
                setRead([...read, email])
                email.read = true
            } else {
                setRead(read.filter((readMail) => readMail != email))
                email.read = false
            }
        }

        return (
            <input
                className='select-checkbox'
                type='checkbox'
                checked={!isRead}
                onChange={toggleRead}
            />
        )
    }

    function StarCheckbox({ email }: EmailProps) {
        const inStarred = (): boolean => {
            if (starred.includes(email)) {
                return true
            } else {
                return false
            }
        }

        const [isChecked, setIsChecked] = useState<boolean>(inStarred)

        const toggleStar = () => {
            setIsChecked((prev) => !prev)
            if (!isChecked) {
                setStarred([...starred, email])
                email.starred = true
            } else {
                setStarred(
                    starred.filter((starredMail) => starredMail != email)
                )
                email.starred = false
            }
        }

        return (
            <input
                className='star-checkbox'
                type='checkbox'
                checked={isChecked}
                onChange={toggleStar}
            />
        )
    }

    const toggleUnread = () => {
        if (showUnread) {
            setShowUnread(false)
            setEmails(initialEmails)
        } else {
            setShowUnread(true)
            setEmails(read)
        }
    }

    const InboxCount = () => {
        let inboxCount: string

        if (showUnread) {
            inboxCount = String(emails.length)
        } else {
            inboxCount = String(emails.length - read.length)
        }

        return <span className='count'>{inboxCount}</span>
    }

    return (
        <div className='app'>
            <Header />
            <nav className='left-menu'>
                <ul className='inbox-list'>
                    <li
                        className={!showStarred ? 'item active' : 'item'}
                        onClick={() => {
                            setShowStarred(false)
                            setEmails(initialEmails)
                        }}
                    >
                        <span className='label'>Inbox</span>
                        <InboxCount />
                    </li>
                    <li
                        className={showStarred ? 'item active' : 'item'}
                        onClick={() => {
                            setShowStarred(true)
                            setEmails(starred)
                        }}
                    >
                        <span className='label'>Starred</span>
                        <span className='count'>{starred.length}</span>
                    </li>

                    <li className='item toggle'>
                        <label htmlFor='hide-read'>Hide read</label>
                        <input
                            id='hide-read'
                            type='checkbox'
                            checked={showUnread}
                            onChange={toggleUnread}
                        />
                    </li>
                </ul>
            </nav>
            <main className='emails'>
                {emails.map((email) => (
                    <li
                        key={email.id}
                        className={!email.read ? 'email read' : 'email'}
                    >
                        <div className='select'>
                            <ReadCheckbox email={email} />
                        </div>
                        <div className='star'>
                            <StarCheckbox email={email} />
                        </div>
                        <div className='sender'>{email.sender}</div>
                        <div className='title'>{email.title}</div>
                    </li>
                ))}
            </main>
        </div>
    )
}

export default App

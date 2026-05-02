import { useState, useRef, useEffect } from 'react'
import { usePokeChat } from '../hooks/usePokeChat'
import styles from './ChatPanel.module.css'

const QUICK_PROMPTS = [
  { label: 'Type matchups?', q: "What's the best Pokémon type matchup?" },
  { label: 'Team building?', q: 'How do I build a balanced Pokémon team?' },
  { label: 'Best starter?', q: 'Which starter Pokémon is best overall?' },
  { label: 'Legendaries?', q: 'Tell me about legendary Pokémon.' },
]

export default function ChatPanel({ onClose }) {
  const { history, loading, sendMessage } = usePokeChat()
  const [input, setInput] = useState('')
  const [pillsVisible, setPillsVisible] = useState(true)
  const [greeted, setGreeted] = useState(false)
  const msgsRef = useRef(null)
  const inputRef = useRef(null)

  // Send greeting on first open
  useEffect(() => {
    if (!greeted && history.length === 0) {
      setGreeted(true)
      sendMessage('__greeting__')
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
  }, [history, loading])

  const handleSend = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setPillsVisible(false)
    await sendMessage(q)
    inputRef.current?.focus()
  }

  const handlePill = async (q) => {
    setPillsVisible(false)
    await sendMessage(q)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  // Filter out the internal greeting trigger from display
  const displayHistory = history.filter((m) => m.content !== '__greeting__')

  return (
    <div className={styles.panel} role="dialog" aria-label="Professor Claude chat">
      <div className={styles.header}>
        <ProfBall />
        <div className={styles.headerInfo}>
          <p className={styles.headerTitle}>Professor Claude</p>
          <p className={styles.headerSub}>Pokémon expert · Powered by Claude · Anthropic</p>
        </div>
        <button className={styles.backBtn} onClick={onClose}>← Back</button>
      </div>

      <div className={styles.messages} ref={msgsRef}>
        {displayHistory.map((msg, i) => (
          <Message key={i} role={msg.role} text={msg.content} />
        ))}
        {loading && <TypingIndicator />}
      </div>

      {pillsVisible && history.length < 3 && (
        <div className={styles.pills}>
          {QUICK_PROMPTS.map((p) => (
            <button key={p.label} className={styles.pill} onClick={() => handlePill(p.q)}>
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.textarea}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 90) + 'px'
          }}
          onKeyDown={handleKey}
          placeholder="Ask anything Pokémon..."
          rows={1}
        />
        <button className={styles.sendBtn} onClick={handleSend} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>

      <div className={styles.poweredBy}>
        <CheckIcon />
        <span className={styles.powText}>Powered by</span>
        <span className={styles.powBrand}>Claude</span>
        <span className={styles.powText}>· Anthropic</span>
        <span className={styles.powScope}>Pokémon knowledge only</span>
      </div>
    </div>
  )
}

function Message({ role, text }) {
  return (
    <div className={`${styles.msg} ${role === 'user' ? styles.user : styles.ai}`}>
      <span className={styles.msgLabel}>{role === 'user' ? 'You' : 'Professor Claude'}</span>
      <div className={styles.bubble}>{text}</div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className={`${styles.msg} ${styles.ai}`}>
      <div className={styles.typing}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  )
}

function ProfBall() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#1a1a2e" stroke="#7c3aed" strokeWidth="2" />
      <circle cx="20" cy="20" r="9" fill="#7c3aed" opacity=".85" />
      <circle cx="20" cy="20" r="4.5" fill="#a78bfa" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#a78bfa" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

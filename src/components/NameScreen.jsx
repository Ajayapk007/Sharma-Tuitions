import { useState } from 'react'

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' },
  card: { background: '#fff', border: '2px solid #333', borderRadius: '4px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '4px 4px 0 #333' },
  title: { fontFamily: "'Courier New', Courier, monospace", fontSize: '2.2rem', fontWeight: 'bold', margin: '0 0 6px 0', letterSpacing: '2px', color: '#111' },
  subtitle: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.95rem', color: '#555', margin: '0 0 20px 0', letterSpacing: '1px' },
  divider: { border: 'none', borderTop: '1px solid #ccc', margin: '0 0 28px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  label: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.9rem', fontWeight: 'bold', textAlign: 'left', color: '#333', letterSpacing: '0.5px' },
  input: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1rem', padding: '10px 12px', border: '2px solid #333', borderRadius: '2px', outline: 'none', background: '#fafafa' },
  error: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.85rem', color: '#cc0000', margin: '0', textAlign: 'left' },
  button: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1rem', fontWeight: 'bold', padding: '12px', background: '#111', color: '#fff', border: '2px solid #111', borderRadius: '2px', cursor: 'pointer', letterSpacing: '1px', marginTop: '6px' },
}

export default function NameScreen({ onContinue }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) { setError('Please enter your name to continue.'); return }
    onContinue(trimmed)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Quick-MCQ</h1>
        <p style={styles.subtitle}>Test Your Knowledge</p>
        <hr style={styles.divider} />
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label} htmlFor="studentName">Enter Your Name</label>
          <input
            id="studentName"
            type="text"
            value={name}
            onChange={e => { setName(e.target.value); setError('') }}
            placeholder="Your full name"
            style={styles.input}
            autoFocus
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Continue</button>
        </form>
      </div>
    </div>
  )
}

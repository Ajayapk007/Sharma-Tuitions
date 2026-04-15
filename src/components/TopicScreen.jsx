import { TOPICS } from '../data/questions'

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', padding: '30px 20px' },
  card: { background: '#fff', border: '2px solid #333', borderRadius: '4px', padding: '36px 40px', maxWidth: '560px', width: '100%', boxShadow: '4px 4px 0 #333' },
  greeting: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1rem', color: '#555', margin: '0 0 4px 0' },
  heading: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1.6rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111', letterSpacing: '1px' },
  instruction: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.85rem', color: '#666', margin: '0 0 28px 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
  topicBtn: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.95rem', fontWeight: 'bold', padding: '16px 12px', background: '#fff', color: '#111', border: '2px solid #333', borderRadius: '2px', cursor: 'pointer', letterSpacing: '0.5px', transition: 'background 0.15s, color 0.15s', textAlign: 'center' },
}

export default function TopicScreen({ studentName, onSelectTopic }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.greeting}>Hello, {studentName}!</p>
        <h2 style={styles.heading}>Select a Topic</h2>
        <p style={styles.instruction}>Choose one topic to start your 10-question quiz.</p>
        <div style={styles.grid}>
          {TOPICS.map(topic => (
            <button
              key={topic}
              onClick={() => onSelectTopic(topic)}
              style={styles.topicBtn}
              onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#111' }}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '30px 20px' },
  card: { background: '#fff', border: '2px solid #333', borderRadius: '4px', padding: '36px 40px', maxWidth: '680px', width: '100%', boxShadow: '4px 4px 0 #333' },
  heading: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1.7rem', fontWeight: 'bold', margin: '0 0 6px 0', color: '#111', letterSpacing: '1px' },
  verdict: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1rem', color: '#444', margin: '0 0 20px 0', fontWeight: 'bold', letterSpacing: '0.5px' },
  divider: { border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.9rem', borderBottom: '1px dotted #e0e0e0' },
  infoLabel: { color: '#777', fontWeight: 'bold' },
  infoValue: { color: '#111', fontWeight: 'bold' },
  scoreBox: { textAlign: 'center', padding: '24px 0 16px 0', fontFamily: "'Courier New', Courier, monospace" },
  scoreNum: { fontSize: '3rem', fontWeight: 'bold', color: '#111' },
  scoreDen: { fontSize: '1.5rem', color: '#555', marginLeft: '4px' },
  scorePercent: { fontSize: '1.1rem', color: '#777', marginLeft: '10px' },
  breakdown: { display: 'flex', gap: '16px', marginBottom: '8px' },
  breakItem: { flex: 1, textAlign: 'center', padding: '16px', borderRadius: '2px', fontFamily: "'Courier New', Courier, monospace" },
  breakNum: { display: 'block', fontSize: '2rem', fontWeight: 'bold', color: '#111' },
  breakLabel: { fontSize: '0.82rem', color: '#555', fontWeight: 'bold', letterSpacing: '0.5px' },
  reviewHeading: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1rem', fontWeight: 'bold', color: '#333', margin: '0 0 12px 0', letterSpacing: '0.5px' },
  reviewList: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' },
  reviewItem: { padding: '10px 14px', background: '#fafafa', borderRadius: '2px' },
  reviewQ: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.85rem', color: '#111', margin: '0 0 4px 0', fontWeight: 'bold' },
  reviewAns: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.82rem', margin: '0' },
  correctAns: { color: '#2e7d32', fontWeight: 'bold' },
  btnRow: { display: 'flex', gap: '14px', flexWrap: 'wrap' },
  retryBtn: { flex: 1, fontFamily: "'Courier New', Courier, monospace", fontSize: '0.95rem', fontWeight: 'bold', padding: '13px', background: '#111', color: '#fff', border: '2px solid #111', borderRadius: '2px', cursor: 'pointer', letterSpacing: '1px' },
  changeBtn: { flex: 1, fontFamily: "'Courier New', Courier, monospace", fontSize: '0.95rem', fontWeight: 'bold', padding: '13px', background: '#fff', color: '#111', border: '2px solid #333', borderRadius: '2px', cursor: 'pointer', letterSpacing: '1px' },
}

function getVerdict(pct) {
  if (pct === 100) return 'Perfect Score!'
  if (pct >= 80) return 'Excellent!'
  if (pct >= 60) return 'Good Job!'
  if (pct >= 40) return 'Keep Practicing!'
  return 'Needs Improvement'
}

export default function ResultScreen({ studentName, selectedTopic, score, quizQuestions, answers, onRetry, onChangeTopic }) {
  const correct = score
  const wrong = quizQuestions.length - score
  const pct = Math.round((score / quizQuestions.length) * 100)

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Quiz Complete</h2>
        <p style={styles.verdict}>{getVerdict(pct)}</p>
        <hr style={styles.divider} />

        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Student</span>
          <span style={styles.infoValue}>{studentName}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.infoLabel}>Topic</span>
          <span style={styles.infoValue}>{selectedTopic}</span>
        </div>

        <div style={styles.scoreBox}>
          <span style={styles.scoreNum}>{score}</span>
          <span style={styles.scoreDen}>/ {quizQuestions.length}</span>
          <span style={styles.scorePercent}>({pct}%)</span>
        </div>

        <div style={styles.breakdown}>
          <div style={{ ...styles.breakItem, background: '#e8f5e9', border: '1.5px solid #4caf50' }}>
            <span style={styles.breakNum}>{correct}</span>
            <span style={styles.breakLabel}>Correct</span>
          </div>
          <div style={{ ...styles.breakItem, background: '#fdecea', border: '1.5px solid #ef5350' }}>
            <span style={styles.breakNum}>{wrong}</span>
            <span style={styles.breakLabel}>Wrong</span>
          </div>
        </div>

        <hr style={styles.divider} />
        <h3 style={styles.reviewHeading}>Answer Review</h3>
        <div style={styles.reviewList}>
          {quizQuestions.map((q, i) => {
            const userAnswer = answers[q.id]
            const isCorrect = userAnswer === q.correctAnswer
            return (
              <div key={q.id} style={{ ...styles.reviewItem, borderLeft: `4px solid ${isCorrect ? '#4caf50' : '#ef5350'}` }}>
                <p style={styles.reviewQ}>Q{i + 1}. {q.questionText}</p>
                <p style={{ ...styles.reviewAns, color: isCorrect ? '#2e7d32' : '#c62828' }}>
                  Your answer: {userAnswer || 'Not answered'}
                  {!isCorrect && (
                    <span style={styles.correctAns}> | Correct: {q.correctAnswer}</span>
                  )}
                </p>
              </div>
            )
          })}
        </div>

        <div style={styles.btnRow}>
          <button onClick={onRetry} style={styles.retryBtn}>Retry Same Topic</button>
          <button onClick={onChangeTopic} style={styles.changeBtn}>Change Topic</button>
        </div>
      </div>
    </div>
  )
}

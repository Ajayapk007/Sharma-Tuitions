const questionCardStyles = {
  card: { background: '#fff', border: '1px solid #ccc', borderRadius: '2px', padding: '20px 24px', marginBottom: '16px' },
  questionNum: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.78rem', color: '#888', margin: '0 0 8px 0', letterSpacing: '0.5px', fontWeight: 'bold' },
  questionText: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.97rem', fontWeight: 'bold', color: '#111', margin: '0 0 16px 0', lineHeight: '1.5' },
  options: { display: 'flex', flexDirection: 'column', gap: '8px' },
  optionBtn: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.9rem', padding: '10px 14px', border: '1.5px solid #555', borderRadius: '2px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.12s, color 0.12s' },
  optionLabel: { fontWeight: 'bold', minWidth: '18px', flexShrink: 0 },
}

function QuestionCard({ question, index, selectedAnswer, onSelect }) {
  return (
    <div style={questionCardStyles.card}>
      <p style={questionCardStyles.questionNum}>Question {index + 1} of 10</p>
      <p style={questionCardStyles.questionText}>{question.questionText}</p>
      <div style={questionCardStyles.options}>
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === option
          return (
            <button
              key={i}
              onClick={() => onSelect(question.id, option)}
              style={{
                ...questionCardStyles.optionBtn,
                background: isSelected ? '#111' : '#fff',
                color: isSelected ? '#fff' : '#111',
                borderColor: isSelected ? '#111' : '#555',
              }}
            >
              <span style={questionCardStyles.optionLabel}>{String.fromCharCode(65 + i)}.</span>
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '700px', margin: '0 auto', padding: '24px 20px' },
  header: { background: '#fff', border: '2px solid #333', borderRadius: '4px', padding: '20px 24px', marginBottom: '20px', boxShadow: '3px 3px 0 #333' },
  topic: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 6px 0', color: '#111', letterSpacing: '1px' },
  progress: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.85rem', color: '#555', margin: '0 0 12px 0' },
  progressBarWrap: { background: '#e5e5e5', borderRadius: '2px', height: '8px', overflow: 'hidden', border: '1px solid #ccc' },
  progressBar: { background: '#111', height: '100%', transition: 'width 0.3s ease', borderRadius: '2px' },
  submitRow: { textAlign: 'center', padding: '16px 0 8px 0' },
  warning: { fontFamily: "'Courier New', Courier, monospace", fontSize: '0.83rem', color: '#aa5500', margin: '0 0 12px 0' },
  submitBtn: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1rem', fontWeight: 'bold', padding: '14px 40px', background: '#111', color: '#fff', border: '2px solid #111', borderRadius: '2px', letterSpacing: '1px', boxShadow: '3px 3px 0 #555' },
}

export default function QuizScreen({ quizQuestions, selectedTopic, answers, onSelectAnswer, onSubmit }) {
  const answered = Object.keys(answers).length
  const allAnswered = answered === quizQuestions.length

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.topic}>Topic: {selectedTopic}</h2>
          <p style={styles.progress}>{answered} / {quizQuestions.length} answered</p>
        </div>
        <div style={styles.progressBarWrap}>
          <div style={{ ...styles.progressBar, width: `${(answered / quizQuestions.length) * 100}%` }} />
        </div>
      </div>

      {quizQuestions.map((q, i) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={i}
          selectedAnswer={answers[q.id] || null}
          onSelect={onSelectAnswer}
        />
      ))}

      <div style={styles.submitRow}>
        {!allAnswered && (
          <p style={styles.warning}>Please answer all {quizQuestions.length} questions before submitting.</p>
        )}
        <button
          onClick={onSubmit}
          disabled={!allAnswered}
          style={{ ...styles.submitBtn, opacity: allAnswered ? 1 : 0.4, cursor: allAnswered ? 'pointer' : 'not-allowed' }}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  )
}

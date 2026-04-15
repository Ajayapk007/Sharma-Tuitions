import { useState } from 'react'
import { getQuizQuestions, calculateScore } from './data/questions'
import NameScreen from './components/NameScreen'
import TopicScreen from './components/TopicScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

const styles = {
  wrapper: { minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f5f5f0', fontFamily: "'Courier New', Courier, monospace" },
  header: { background: '#111', color: '#fff', padding: '14px 24px', borderBottom: '2px solid #333' },
  headerTitle: { fontFamily: "'Courier New', Courier, monospace", fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '3px', cursor: 'pointer' },
  main: { flex: 1 },
  footer: { textAlign: 'center', padding: '14px', fontFamily: "'Courier New', Courier, monospace", fontSize: '0.78rem', color: '#777', borderTop: '1px solid #ccc', background: '#fff', letterSpacing: '0.5px' },
}

export default function App() {
  const [screen, setScreen] = useState('name')      // 'name' | 'topic' | 'quiz' | 'result'
  const [studentName, setStudentName] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [quizQuestions, setQuizQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)

  function handleNameContinue(name) {
    setStudentName(name)
    setScreen('topic')
  }

  function handleTopicSelect(topic) {
    const questions = getQuizQuestions(topic)
    setSelectedTopic(topic)
    setQuizQuestions(questions)
    setAnswers({})
    setScreen('quiz')
  }

  function handleSelectAnswer(questionId, answer) {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  function handleSubmit() {
    const finalScore = calculateScore(quizQuestions, answers)
    setScore(finalScore)
    setScreen('result')
  }

  function handleRetry() {
    handleTopicSelect(selectedTopic)
  }

  function handleChangeTopic() {
    setAnswers({})
    setScreen('topic')
  }

  function handleHeaderClick() {
    setScreen('name')
    setStudentName('')
    setSelectedTopic('')
    setQuizQuestions([])
    setAnswers({})
    setScore(0)
  }

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <span style={styles.headerTitle} onClick={handleHeaderClick}>Quick-MCQ</span>
      </header>

      <main style={styles.main}>
        {screen === 'name' && (
          <NameScreen onContinue={handleNameContinue} />
        )}
        {screen === 'topic' && (
          <TopicScreen studentName={studentName} onSelectTopic={handleTopicSelect} />
        )}
        {screen === 'quiz' && (
          <QuizScreen
            quizQuestions={quizQuestions}
            selectedTopic={selectedTopic}
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            onSubmit={handleSubmit}
          />
        )}
        {screen === 'result' && (
          <ResultScreen
            studentName={studentName}
            selectedTopic={selectedTopic}
            score={score}
            quizQuestions={quizQuestions}
            answers={answers}
            onRetry={handleRetry}
            onChangeTopic={handleChangeTopic}
          />
        )}
      </main>

      <footer style={styles.footer}>Copyright 2024 Sharma Tuitions</footer>
    </div>
  )
}

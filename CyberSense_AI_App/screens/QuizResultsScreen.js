import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ScreenContainer from '../components/ui/ScreenContainer';
import { ScreenHeaderWithBack } from '../components/ui/ScreenHeaderWithBack';
import { CheckCircle, XCircle, Trophy } from 'phosphor-react-native';

const ReviewItem = ({ question, userAnswer }) => {
    const isCorrect = userAnswer === question.correctAnswer;
    return (
        <View style={styles.reviewItem}>
            <Text style={styles.questionText}>{question.text}</Text>
            <View style={styles.answerRow}>
                {isCorrect ? (
                    <CheckCircle color="#34C759" size={20} weight="fill" />
                ) : (
                    <XCircle color="#D73A49" size={20} weight="fill" />
                )}
                <Text style={[styles.answerText, { color: isCorrect ? '#34C759' : '#D73A49' }]}>
                    Your answer: {userAnswer || "Not Answered"}
                </Text>
            </View>
            {!isCorrect && (
                <Text style={styles.correctAnswerText}>Correct answer: {question.correctAnswer}</Text>
            )}
            <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
    );
};

const QuizResultsScreen = ({ navigation, route }) => {
  const { score, totalQuestions, quizData, userAnswers } = route.params;

 
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const hasMcqQuestions = totalQuestions > 0;

  return (
    <ScreenContainer>
      <ScreenHeaderWithBack title="Quiz Results" navigation={navigation} />
      <ScrollView>
        <View style={styles.summaryContainer}>
            <Trophy color="#FFD700" size={60} weight="fill" />
            <Text style={styles.title}>Quiz Completed!</Text>
            
            {hasMcqQuestions ? (
                <>
                    <Text style={styles.scoreValue}>{score} / {totalQuestions}</Text>
                    <Text style={styles.percentageText}>({percentage}%)</Text>
                </>
            ) : (
                <Text style={styles.noScoreText}>This quiz was not graded.</Text>
            )}
        </View>

        {hasMcqQuestions && (
            <>
                <Text style={styles.reviewTitle}>Review Your Answers</Text>
                {quizData.questions.map((q, index) => (
                    q.type === 'multiple-choice' && <ReviewItem key={q.id} question={q} userAnswer={userAnswers[index]} />
                ))}
            </>
        )}

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('QuizList')}
        >
          <Text style={styles.buttonText}>Back to Quizzes</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  summaryContainer: { alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#2D2D33', marginBottom: 16 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  scoreValue: { color: '#FFFFFF', fontSize: 36, fontWeight: 'bold' },
  percentageText: { color: '#34C759', fontSize: 18, fontWeight: '600', marginTop: 4 },
  noScoreText: { color: '#8D8D93', fontSize: 16, fontStyle: 'italic', marginTop: 16 },
  reviewTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 10 },
  reviewItem: { backgroundColor: '#1C1C22', borderRadius: 12, padding: 16, marginHorizontal: 20, marginBottom: 12, borderWidth: 1, borderColor: '#2D2D33' },
  questionText: { color: '#EAEAEA', fontSize: 16, fontWeight: '600', marginBottom: 12 },
  answerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  answerText: { fontSize: 14, flexShrink: 1 },
  correctAnswerText: { color: '#8D8D93', fontSize: 14, marginTop: 8 },
  explanationText: { color: '#8D8D93', fontSize: 14, lineHeight: 20, marginTop: 12, borderTopWidth: 1, borderTopColor: '#2D2D33', paddingTop: 12 },
  button: { backgroundColor: '#8A63D2', paddingVertical: 16, margin: 20, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default QuizResultsScreen;

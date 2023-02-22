import { Heading, Flex, Button, Box } from '@chakra-ui/react';
import { useState } from 'react'
import { Question } from '../questions/prompt.types';

const QuestionItem = ({question, onCorrectAnswer}: {question: Question, onCorrectAnswer: () => void}) => {
  const [answerState, setAnswerState] = useState<'pending' | 'wrong' | 'correct'>('pending')
  const [selectedOption, setSelectedOption] = useState<null | number>(null)

  const handleQuestionSubmit = (currentIndex: number) => () => {
    setSelectedOption(currentIndex);
    if (currentIndex == question?.correctAnswerIndex) {
      setAnswerState('correct');
      onCorrectAnswer();
    }
    setAnswerState('wrong');
  }

  const getColorScheme = (index: number) => {
    const isCorrect = index == question?.correctAnswerIndex;
    const wasWrongSelected = answerState === 'wrong' && selectedOption === index;
    const wasCorrect = answerState === 'correct' && selectedOption === index;

    if (selectedOption === null) {
    return "gray"
    }

    if (wasCorrect || isCorrect) {
      return "green";
    }

    if (wasWrongSelected) {
      return "red"
    }

    return "gray"
  }

  return (
    <Box>
      <Box mt={12}>
        <Heading as="h2">
          Question: {question.question}
        </Heading>
        <Flex gap={4} mt="8" justifyContent={"center"}>
          {
            question.options.map((option, index) => 
               (<Button key={option+'-' + index} colorScheme={getColorScheme(index)} onClick={handleQuestionSubmit(index)}>{option}</Button>)
            )
          }
        </Flex>
      </Box>
      <Box mt="44">
        <Button onClick={() => {
          setAnswerState('pending');
          setSelectedOption(null);
        }}>Reset question</Button>
      </Box>
    </Box>
  )
}

export default QuestionItem
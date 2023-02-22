import { ChangeEventHandler, useState } from 'react'
import './App.css'
import { Alert, AlertIcon, Box, Button, Container, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Select } from '@chakra-ui/react'
import { VERBS } from './questions/prompt.const'
import { Question, Verbs } from './questions/prompt.types'
import { generatePrompt } from './questions/prompt'
import { openai } from './openai'
import { parse } from './parser'
import QuestionItem from './components/Question'

function App() {
  const [verbTime, setTime] = useState<Verbs>(VERBS.PRESENT_SIMPLE)
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const {value} = event.target
    setTime(value as Verbs);
  };

  const handleFormSummit: React.FormEventHandler<HTMLFormElement>  = async (event) => {
    event.preventDefault();
    setLoading(true);
    setQuestion(null);
    setError(false);

    try {
      const result = await openai().createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(verbTime, 5, 4),
        max_tokens: 100,
      });
      if (result.data.choices[0].text) {
        const _question = parse(result.data.choices[0].text);
        setQuestion(_question)
        setLoading(false)
        setQuestionNumber(questionNumber + 1)
        console.log({_question})
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  const handleCorrect = () => {
    setCorrectAnswers(correctAnswers + 1)
  }

  return (
      <Container mt={12}>
        {
          error && <Alert status='error'>
          <AlertIcon />
          There was an error processing your request
        </Alert>
        }
        <Heading mb={8}>
          Lets Learn English
        </Heading>
        <form onSubmit={handleFormSummit}> 
        <FormControl>
          <FormLabel>Verbal tense:</FormLabel>
          <Select onChange={handleSelectChange} value={verbTime}>
            {
              Object.values(VERBS).map((time) => (
                <option value={time}>{time}</option>
              ))
            }
          </Select>
        </FormControl>
        <Box mt={4} mb="12">
          <Button type='submit' colorScheme={"blue"} isLoading={loading}>Get Question</Button>
        </Box>
        </form>
        <Divider/>
        <Heading mb={8} mt="8" >
          Score: {correctAnswers}/{questionNumber}
        </Heading>
        {question && <QuestionItem question={question} onCorrectAnswer={handleCorrect} />}
      </Container>
  )
}

export default App

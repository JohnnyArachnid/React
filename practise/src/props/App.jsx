import Student from './Student.jsx'

function App() {
  return(
    <>
      <Student name="Daniel" age={21} isStudent={true}/>
      <Student name="Liliana" age={20} isStudent={true}/>
      <Student name="Jan" age={21} isStudent={true}/>
      <Student name="Michał" age={21} isStudent={false}/>
      <Student />
    </>
  );
}

export default App

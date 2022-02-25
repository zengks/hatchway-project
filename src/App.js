
import StudentResult from './components/students/StudentResult'
import StudentSearch from './components/students/StudentSearch'
import { StudentProvider } from './context/StudentContext'


function App() {
  return (
    <>
      <StudentProvider>
        <div className='container bg-white border rounded-3'>
          <StudentSearch />
          <StudentResult />
        </div>
        
      </StudentProvider>
      
    </>
  );
}

export default App;

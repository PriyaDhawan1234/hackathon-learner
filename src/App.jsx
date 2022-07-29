import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [instructorLatitude, setInstructorLatitude] = useState(0);
  const [instructorLongitude, setInstructorLongitude] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "instructor_location", "1zgqpcjSN7nvIJgDsjqw"),
      (doc) => {
        console.log("Current data: ", doc.data());
        setInstructorLatitude(doc.data().location._lat);
        setInstructorLongitude(doc.data().location._long);
      }
    );

    return unsub;
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hackathon Learner</h1>
      <div className="card">
        <h2>Instructor location</h2>
        <p>{`Latitude: ${instructorLatitude}`}</p>
        <p>{`Longitude: ${instructorLongitude}`}</p>
      </div>
    </div>
  );
}

export default App;

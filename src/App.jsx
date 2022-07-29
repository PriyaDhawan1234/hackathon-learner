import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Map from "./Map";
import "./firebaseConfig";
import {
  doc,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

function App() {
  const [instructorLatitude, setInstructorLatitude] = useState(0);
  const [instructorLongitude, setInstructorLongitude] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "instructor_location", "1zgqpcjSN7nvIJgDsjqw"),
      (doc) => {
        setInstructorLatitude(doc.data().location._lat);
        setInstructorLongitude(doc.data().location._l);
      }
    );
    return unsub;
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "instructor_location"),
      where("journey_id", "==", "1"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().location);
      });
    });
    return unsubscribe;
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
      <Map></Map>
    </div>
  );
}

export default App;

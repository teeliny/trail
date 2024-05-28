'use client'
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const fetchApiRef = useRef(false);
  const [speed, setSpeed] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fetchApiRef.current) { 
      fetchApiRef.current = true;
      setLoading(true);
      try {
        axios.get('/api/speed-test-api').then((res) => {
          setSpeed(res.data.data);
          setLoading(false);
          fetchApiRef.current = false;
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [])
  
  console.log(loading, "loading")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{loading ? 'Loading...' : speed.toFixed(3)}</p>
    </main>
  );
}

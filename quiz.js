import React, { useState, useEffect,useRef } from 'react';
import './quiz.css';
import { data } from './data';
const Quiz=()=>{
    let [index,setIndex]=useState(0);
    let [question,SetQuestion]=useState(data[index]);
    let [lock,setLock]=useState(false);
    let [score,setScore]=useState(0);
    let [result,setResult]=useState(false);
    let [timeLeft,setTimeLeft]=useState(30);
    let option1=useRef(null);
    let option2=useRef(null);
    let option3=useRef(null);
    let option4=useRef(null);
    let option_array=[option1,option2,option3,option4];

    useEffect(() => {
        if (timeLeft > 0 && !lock && !result) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else if (timeLeft === 0) {
            setLock(true);
            next(); // Automatically move to next question when time runs out
        }
    }, [timeLeft, lock, result]);
    const checkAns=(e,ans)=>{
        if (lock===false) {
            if (question.ans===ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev=>prev+1);
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");  
            }

        }
    };
    const next =()=>{
        if(lock===true){
            if(index===data.length-1){
                setResult(true);
            }
            setIndex(++index);
            SetQuestion(data[index]);
            setLock(false);
            setTimeLeft(30);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
        }
    };
    const restart=()=>{
        setIndex(0);
        setLock(false);
        SetQuestion(data[0]);
        setResult(false);
        setScore(0);
        setTimeLeft(30);
    };
    return(
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result?<></>:<><h2>{index+1} . {question.question}</h2>
            <div className='timer'>Time left: {timeLeft}s</div>
            <ul>
                <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
                <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
                <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
                <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>

            </ul>
            <button onClick={next}>next</button>
            <div className='Index'> {index+1} out of {data.length} questions</div>
            </>}
            {result?<>
            <h2>you scored {score} out of {data.length}</h2>
            <button onClick={restart}>Restart</button></>:<></>}

        </div>
    )
}
export default Quiz;
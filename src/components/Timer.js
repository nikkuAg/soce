import React, { useRef, useState, useEffect } from 'react'
import "./timer.css"

export const Timer = (props) => {

    const [day, setday] = useState("00")
    const [hour, sethour] = useState("00")
    const [min, setmin] = useState("00")
    const [sec, setsec] = useState("00")

    let interval = useRef()
    const startTimer = () => {
        const finalDate = new Date(props.year, props.month, props.day, props.hour, props.min, props.sec).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime()
            const diff = finalDate - now

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            if (diff < 0) {
                clearInterval(interval.current)
            } else {
                setday(days)
                sethour(hours)
                setmin(mins)
                setsec(secs)
            }

        }, 1000);
    }

    useEffect(() => {
        startTimer()
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    return (
        <div id="timer">
            <h3 id="headingTimer">
                New Update!!!<br />
                <span id="timeHead">Opening & Closing Ranks of JoSAA 2021 <span style={{ color: "red" }}>Round 4</span> Seat Allotment updated!! </span>
            </h3>
            {/* <div id="countdown">
                <div id="time">
                    <span>{day}</span>
                    <small>Days</small>
                </div>
                :
                <div id="time">
                    <span>{hour}</span>
                    <small>Hours</small>
                </div>
                :
                <div id="time">
                    <span>{min}</span>
                    <small>Minutes</small>
                </div>
                :
                <div id="time">
                    <span>{sec}</span>
                    <small>Seconds</small>
                </div>
            </div> */}
        </div>
    )
}

import "./EventCalendar.css"
import { numberToMonthMap, daysInMonthMap } from "../../utils/BandGenres"
import { useEffect, useState } from "react";
import type { MusicEvent } from "../CreateAccount/CreateAccount";

export default function EventCalendar() {
    let currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [numberOfTheDay, setNumberOfTheDay] = useState(0);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [inEventView, setInEventView] = useState(false);
    const [whatEventTypeIsShown, setWhatEventTypeIsShown] = useState<MusicEvent>("Concert")
    const findKeyAssociatedWithValue = (value: String, index: number): number => {
        if (value === undefined && index === 13) return 13;
        if (value === undefined && index === 1) return 0;
        for (const key of Object.keys(numberToMonthMap)) {
            if (numberToMonthMap[Number(key)] === value) {
                return Number(key);
            }
        }
        return -1;
    }

    const travelBackInTime = () => {
        if (currentMonth === currentDate.getMonth() + 1 && currentYear === currentDate.getFullYear()) {
            return;
        }
        if (findKeyAssociatedWithValue(numberToMonthMap[currentMonth - 1], currentMonth - 1) < 1) {
            setCurrentYear(currentYear - 1);
            setCurrentMonth(12);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    const moveForwardInTime = () => {
        if (findKeyAssociatedWithValue(numberToMonthMap[currentMonth + 1], currentMonth + 1) > 12) {
            setCurrentMonth(1);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }

    const grabDaysForMonth = (month: string) => {
        setNumberOfDays(daysInMonthMap[month]);
    }

    const loadDaysForMonth = (dayNum: number) => {
        let divDays = [];
        for (let i = 1; i <= dayNum; i++) {
            const label = determineDayOfTheWeek(i);
            divDays.push(
                <div className="DayOfTheWeekArea">
                    <label className="NameOfTheDay">{label}</label>
                    <div key={i} className="IndividualDayNum" onClick={() => showEventsForTheDay(i)}>{i}</div>
                </div>
            );
        }
        return divDays;
    }

    useEffect(() => {
        grabDaysForMonth(numberToMonthMap[currentMonth]);
    }, [currentMonth]);

    const determineDayOfTheWeek = (dayNumber: number) => {
        if (dayNumber < 1 || dayNumber > daysInMonthMap[currentMonth] || dayNumber > 7) {
            return undefined;
        }
        const date = new Date(currentYear, currentMonth - 1, dayNumber);
        const dayIndex = date.getDay();
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[dayIndex];
    };

    const showEventsForTheDay = (day: number) => {
        setNumberOfTheDay(day);
        setInEventView(true);
    };

    return (
        <div className="CalendarPage">
            <h1 className="CalendarCompanyName">Encore</h1>
            {!inEventView && (
                <div className="Calendar">
                    <div className="CalendarHeader">
                        <div onClick={travelBackInTime} className="BackTime">Back</div>
                        <div className="MonthAndYear">{numberToMonthMap[currentMonth]} {currentYear}</div>
                        <div onClick={moveForwardInTime} className="ForwardTime">Forward</div>
                    </div>
                    <div className="EachDay">
                        {loadDaysForMonth(numberOfDays)}
                    </div>
                </div>
            )}
            {inEventView && (
                <div>
                    <div className="EventViewHeader">
                        <div className="EmptySpace"></div>
                        <h1 className="EventForTitle">Events for {numberToMonthMap[currentMonth]} {numberOfTheDay}</h1>
                        <button onClick={() => setInEventView(false)} className="BackToCalendar">Back</button>
                    </div>
                    <div className="RowOfEventTabs">
                        <div onClick={() => setWhatEventTypeIsShown("Concert")} className="ConcertTab">Concerts</div>
                        <div onClick={() => setWhatEventTypeIsShown("Music Festival")} className="FestivalTab">Music Festivals</div>
                        <div onClick={() => setWhatEventTypeIsShown("Gig")} className="GigTab">Gigs</div>
                    </div>
                    {whatEventTypeIsShown === "Concert" && (
                        <div className="ConcertView">
                            Inside Concert
                            <div className="AvailableEvent">
                                <div>State Farm Arena</div>
                                <div>6:00PM</div>
                                <div> 500 $ </div>
                                <div> Manager Mike </div>
                            </div>
                        </div>
                    )}
                    {whatEventTypeIsShown === "Music Festival" && (
                        <div className="FestivalView">
                            Inside Music
                            <div className="AvailableEvent">
                                <div>State Farm Arena</div>
                                <div>6:00PM</div>
                                <div> 500 $ </div>
                                <div> Manager Mike </div>
                            </div>
                        </div>
                    )}
                    {whatEventTypeIsShown === "Gig" && (
                        <div className="GigView">
                            Inside Gig
                            <div className="AvailableEvent">
                                <div>State Farm Arena</div>
                                <div>6:00PM</div>
                                <div> 500 $ </div>
                                <div> Manager Mike </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
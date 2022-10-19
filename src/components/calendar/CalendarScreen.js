import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import  { uiOpenModal } from '../../actions/ui'
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFab } from '../ui/DeleteEventFab';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer
// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar pastel',
//     user: {
//         _id:'123',
//         name: 'Francisco'
//     }
// }]


export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const {events, activeEvent} = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')


    useEffect(() => {
        
        dispatch(eventStartLoading());

    }, [ dispatch ])

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())    
    }

    const onSelectEvent = (e) => {
        //dispatch(uiOpenModal());
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    const eventStylesGetter = (event, start, end, isSelected) => {
        
        

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }


    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                showMultiDayTimes
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStylesGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}

            />

        <AddNewFab/> 
        
        { activeEvent && <DeleteEventFab/> }

        <CalendarModal/>
        </div>
    )
}

import { Request, Response } from "express";
import {
  creatCalendarEvent,
  getCalendarEvents,
} from "../services/calendarService";

export const getCalendarEventsController = async (
  req: Request,
  res: Response,
  request: any
) => {
  try {
    const user = req.user as any;
    const events = await getCalendarEvents(
      user.accessToken,
      user.refreshToken,
      user.email
    );

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching calendar events", error });
  }
};

export const createEventController = async (
  req: Request,
  res: Response,
  request: any
) => {
  try {
    const user = req.user as any;
    const eventData = req.body;

    console.log("event-data-c", eventData);

    const event = await creatCalendarEvent(
      user.accessToken,
      user.refreshToken,
      eventData
    );
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating calendar event", error });
  }
};

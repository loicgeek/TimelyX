import { DateTime } from "ts-luxon";

export class EventService {

    static fakeEvents(){
        return generateFakeEventsForWeek();
    }      
}

const  getRandomInt = (min:any, max:any)=> {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function generateFakeEventsForWeek  () {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
    const titles = ["Team Meeting", "Client Call", "Code Review", "Marketing Strategy", "Design Sync"];
    const locations = ["Conference Room A", "Zoom", "Office 1", "Office 2", "Online"];
    const descriptions = [
      "Discuss project updates and deadlines.",
      "Meet with the client to discuss requirements.",
      "Review the recent code changes and PRs.",
      "Plan the marketing strategy for Q4.",
      "Sync with the design team on new features."
    ];
    const attendees = [
      ["alice@example.com", "bob@example.com"],
      ["john@example.com", "jane@example.com"],
      ["mike@example.com", "sara@example.com"],
      ["tom@example.com", "lisa@example.com"],
      ["nina@example.com", "peter@example.com"]
    ];
  
    const events = [];
    const now = new Date();
  
    for (let i = 0; i < 13; i++) {
      const randomDay = getRandomInt(1, 7); // Pick a random day of the current week
      const startHour = getRandomInt(8, 18); // Random hour between 8 AM and 6 PM
      const duration = getRandomInt(1, 3); // Random event duration between 1 and 3 hours
  
      const startDate = new Date(now);
      startDate.setDate(now.getDate() + randomDay - now.getDay()); // Set to a random day of the week
      startDate.setHours(startHour, 0, 0, 0);
  
      const endDate = new Date(startDate);
      endDate.setHours(startHour + duration);
  
      const event = {
        id:`${DateTime.now().toMillis().toString()}-${i}`,
        title: titles[getRandomInt(0, titles.length)],
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        location: locations[getRandomInt(0, locations.length)],
        description: descriptions[getRandomInt(0, descriptions.length)],
        allDay: false,
        color: colors[getRandomInt(0, colors.length)],
        attendees: attendees[getRandomInt(0, attendees.length)],
      };
  
      events.push(event);
    }
  
    return events;
  }

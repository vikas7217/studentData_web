const GetTimePeriod = () => {
    const hour = new Date().getHours();

    const periods = [
        { start: 5, end: 12, name: "Morning" },
        { start: 12, end: 17, name: "Afternoon" },
        { start: 17, end: 21, name: "Evening" },
        { start: 21, end: 24, name: "Night" },
        { start: 0, end: 5, name: "Night" }
    ];

    const period = periods.find(p => hour >= p.start && hour < p.end);

   const timePeriod =  period ? period.name : "Unknown";
    return `Welcome Good ${timePeriod}`
}

export default GetTimePeriod
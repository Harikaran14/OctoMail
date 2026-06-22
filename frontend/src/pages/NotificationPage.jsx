import useAnalytics from "../hooks/useAnalytics";
import StatCard from "../components/StatCard";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function NotificationPage(){
    

    const {

        totalEmails,

        highPriorityEmails,

        pendingTasks,

        overdueTasks,

        categoryData,

        activityData,

        priorityData,

        topSenders,

        taskDeadlineData

    }

    = useAnalytics();

    return(

        <div>

            <h1>
                Analytics
            </h1>

            {/* STAT CARDS */}

            <div>

                <StatCard
                title="Total Emails"
                value={totalEmails}
                />

                <StatCard
                title="High Priority"
                value={highPriorityEmails}
                />

                <StatCard
                title="Pending Tasks"
                value={pendingTasks}
                />

                <StatCard
                title="Overdue Tasks"
                value={overdueTasks}
                />

            </div>

            {/* CATEGORY CHART */}

            <h2>
                Email Categories
            </h2>

            <BarChart
            width={700}
            height={300}
            data={categoryData}
            >
                <CartesianGrid />
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="value"/>
            </BarChart>

            {/* ACTIVITY CHART */}

            <h2>
                Email Activity Trend
            </h2>

            <LineChart
            width={700}
            height={300}
            data={activityData}
            >
                <CartesianGrid />
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line
                type="monotone"
                dataKey="count"
                />
            </LineChart>

            {/* PRIORITY CHART */}

            <h2>
                Priority Distribution
            </h2>

            <PieChart
            width={400}
            height={300}
            >
                <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                />
                <Tooltip/>
            </PieChart>

            {/* TOP SENDERS */}

            <h2>
                Top Senders
            </h2>

            {
            topSenders.map(sender=>(
                <p
                key={sender.sender}
                >
                    {sender.sender}
                    {" - "}
                    {sender.count}
                </p>
            ))
            }

            {/* TASK TABLE */}

            <h2>
                Tasks & Deadlines
            </h2>

            <table>

                <thead>

                    <tr>

                        <th>
                            Task
                        </th>

                        <th>
                            Deadline
                        </th>

                        <th>
                            Priority
                        </th>

                        <th>
                            Email
                        </th>

                    </tr>

                </thead>

                <tbody>

                {
                taskDeadlineData.map(
                    (task,index)=>(

                        <tr
                        key={index}
                        >

                            <td>
                                {task.task}
                            </td>

                            <td>
                                {task.deadline}
                            </td>

                            <td>
                                {task.priority}
                            </td>

                            <td>
                                {task.subject}
                            </td>

                        </tr>

                    )
                )
                }

                </tbody>

            </table>

        </div>

    );
}


export default NotificationPage;


export function ActivitiesList({ user }) {
    console.log(user.activities)
    return (
        <ul className="activity-list">
            {user.activities.map((activity,idx) =>
                <li key={idx}>{activity.txt}, at:{new Date(activity.at).toLocaleString()}</li>
            )}
        </ul>
    )
}
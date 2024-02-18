import { utilService } from '../services/util.service.js'


export function ActivitiesList({ user }) {

   
    return (
        <ul className="activity-list">
            {user.activities.map((activity,idx) =>
                <li key={idx}>{activity.txt}, {utilService.calcTime(activity.at)}</li>
               
            )}
        </ul>
    )
}
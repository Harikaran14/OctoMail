
function NotificationCard({title, message, type}){

    return (
        <div>

            <h3>{title}</h3>
            <h3>{message}</h3>
            <h3>{type}</h3>

        </div>
    );
}

export default NotificationCard;

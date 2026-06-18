function EmailCard({

    email, onclick

}){

    return (

        <div onClick={onclick}>

            <h3>

                {email.subject}

            </h3>

            <p>

                From:
                {email.sender}

            </p>

            <p>

                Priority:
                {email.priority}

            </p>

            <p>

                {email.summary}

            </p>

        </div>

    );

}

export default EmailCard;